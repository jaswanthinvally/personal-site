import { Client, collectPaginatedAPI } from '@notionhq/client'

let cachedClient
let cachedDataSourceId
let cachedAuthKey

function envValue(env, ...keys) {
  for (const key of keys) {
    const value = env[key]
    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
  }
  return ''
}

const SHARE_HINT =
  'The Notion token works, but the "my website" integration cannot see your projects database. In Notion, open the database → ••• → Connections → Connect to → my website. Then paste the database ID from the Notion URL into DATABASE_ID (the 32-character id in the URL, not the integration id).'

function getCredentials(env) {
  const token = envValue(env, 'SECRET_TOKEN', 'ACCESS_TOKEN', 'NOTION_TOKEN', 'NOTION_API_KEY')
  const databaseId = envValue(
    env,
    'DATABASE_ID',
    'NOTION_DATABASE_ID',
    'NOTION_DB_ID',
    'DATA_SOURCE_ID',
    'NOTION_DATA_SOURCE_ID'
  )

  if (!token || !databaseId) {
    throw new Error(
      'Missing Notion credentials. Set SECRET_TOKEN and DATABASE_ID in .env'
    )
  }

  return { token, databaseId }
}

function getClient(env) {
  const { token } = getCredentials(env)
  if (!cachedClient || cachedAuthKey !== token) {
    cachedClient = new Client({ auth: token })
    cachedAuthKey = token
    cachedDataSourceId = undefined
  }
  return cachedClient
}

async function resolveFromSearch(notion) {
  const searches = [
    await notion.search({
      query: 'projects',
      filter: { property: 'object', value: 'data_source' },
    }),
    await notion.search({
      filter: { property: 'object', value: 'data_source' },
    }),
  ]

  for (const result of searches) {
    const match = result.results.find((item) => item.object === 'data_source')
    if (match?.id) {
      return match.id
    }
  }

  return ''
}

async function getDataSourceId(env) {
  if (cachedDataSourceId) {
    return cachedDataSourceId
  }

  const { databaseId } = getCredentials(env)
  const notion = getClient(env)

  try {
    const database = await notion.databases.retrieve({ database_id: databaseId })
    const dataSourceId = database.data_sources?.[0]?.id
    if (dataSourceId) {
      cachedDataSourceId = dataSourceId
      return dataSourceId
    }
  } catch {
    // May already be a data source id, or the database is not shared yet.
  }

  try {
    const dataSource = await notion.dataSources.retrieve({
      data_source_id: databaseId,
    })
    cachedDataSourceId = dataSource.id
    return dataSource.id
  } catch {
    // Fall through to search.
  }

  const found = await resolveFromSearch(notion)
  if (found) {
    cachedDataSourceId = found
    return found
  }

  throw new Error(SHARE_HINT)
}

function richTextToPlain(richText = []) {
  return richText.map((item) => item.plain_text).join('')
}

function getProperty(properties, name) {
  return properties?.[name]
}

function readPlain(property) {
  if (!property) {
    return ''
  }

  switch (property.type) {
    case 'title':
      return richTextToPlain(property.title)
    case 'rich_text':
      return richTextToPlain(property.rich_text)
    case 'url':
      return property.url || ''
    case 'date':
      return property.date?.start || ''
    case 'status':
      return property.status?.name || ''
    case 'select':
      return property.select?.name || ''
    case 'number':
      return property.number == null ? '' : String(property.number)
    default:
      return ''
  }
}

function readTags(property) {
  if (!property) {
    return []
  }

  if (property.type === 'multi_select') {
    return property.multi_select.map((tag) => tag.name).filter(Boolean)
  }

  return readPlain(property)
    .split(/[;,]/)
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function normalizeImageUrl(url) {
  if (!url) {
    return ''
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `https://${url}`
}

function mapPage(page) {
  const properties = page.properties || {}

  return {
    id: page.id,
    title: readPlain(getProperty(properties, 'Name')),
    description: readPlain(getProperty(properties, 'Description')),
    featuredImage: normalizeImageUrl(
      readPlain(getProperty(properties, 'Featured Image'))
    ),
    publishedDate: readPlain(getProperty(properties, 'Published Date')),
    slug: readPlain(getProperty(properties, 'Slug')),
    status: readPlain(getProperty(properties, 'Status')),
    tags: readTags(getProperty(properties, 'Tags')),
  }
}

function isPublished(post) {
  return post.status.trim().toLowerCase() === 'published' && Boolean(post.slug)
}

async function queryAllPages(env) {
  const notion = getClient(env)
  const dataSourceId = await getDataSourceId(env)

  return collectPaginatedAPI(notion.dataSources.query, {
    data_source_id: dataSourceId,
  })
}

async function loadBlocks(env, blockId) {
  const notion = getClient(env)
  const blocks = await collectPaginatedAPI(notion.blocks.children.list, {
    block_id: blockId,
  })

  return Promise.all(
    blocks.map(async (block) => {
      if (!block.has_children) {
        return block
      }

      return {
        ...block,
        children: await loadBlocks(env, block.id),
      }
    })
  )
}

export async function listPublishedPosts(env) {
  const pages = await queryAllPages(env)
  return pages
    .map(mapPage)
    .filter(isPublished)
    .sort((a, b) => (b.publishedDate || '').localeCompare(a.publishedDate || ''))
}

export async function getPublishedPostBySlug(env, slug) {
  const posts = await listPublishedPosts(env)
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    return null
  }

  return {
    ...post,
    blocks: await loadBlocks(env, post.id),
  }
}
