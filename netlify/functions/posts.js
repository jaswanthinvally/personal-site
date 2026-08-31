import { getPublishedPostBySlug, listPublishedPosts } from '../../server/notion.js'

function json(status, body) {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  }
}

function slugFromEvent(event) {
  const splat = event.pathParameters?.splat
  if (typeof splat === 'string' && splat) {
    return decodeURIComponent(splat)
  }

  const path = event.path || ''
  const match = path.match(/\/(?:\.netlify\/functions\/posts|api\/posts)\/([^/?#]+)/)
  if (match?.[1]) {
    return decodeURIComponent(match[1])
  }

  return ''
}

export async function handler(event) {
  if (event.httpMethod !== 'GET') {
    return json(405, { error: 'Method not allowed' })
  }

  try {
    const slug = slugFromEvent(event)
    if (slug) {
      const post = await getPublishedPostBySlug(process.env, slug)
      if (!post) {
        return json(404, { error: 'Post not found' })
      }
      return json(200, { post })
    }

    const posts = await listPublishedPosts(process.env)
    return json(200, { posts })
  } catch (error) {
    console.error('[netlify/posts]', error.body || error.message || error)
    return json(500, {
      error:
        error.message ||
        'Could not load posts from Notion. Check SECRET_TOKEN and DATABASE_ID in Netlify env vars.',
    })
  }
}
