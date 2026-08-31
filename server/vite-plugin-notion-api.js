import { getPublishedPostBySlug, listPublishedPosts } from './notion.js'

function sendJson(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

function createMiddleware(env) {
  return async function notionApiMiddleware(req, res, next) {
    const url = (req.url || '').split('?')[0]

    if (!url.startsWith('/api/posts')) {
      next()
      return
    }

    if (req.method !== 'GET') {
      sendJson(res, 405, { error: 'Method not allowed' })
      return
    }

    try {
      if (url === '/api/posts') {
        const posts = await listPublishedPosts(env)
        sendJson(res, 200, { posts })
        return
      }

      const match = url.match(/^\/api\/posts\/([^/]+)$/)
      if (!match) {
        sendJson(res, 404, { error: 'Not found' })
        return
      }

      const post = await getPublishedPostBySlug(env, decodeURIComponent(match[1]))
      if (!post) {
        sendJson(res, 404, { error: 'Post not found' })
        return
      }

      sendJson(res, 200, { post })
    } catch (error) {
      console.error('[notion-api]', error.body || error.message || error)
      sendJson(res, 500, {
        error:
          error.message ||
          'Could not load posts from Notion. Check that the integration can access the database.',
      })
    }
  }
}

export function notionApiPlugin(env) {
  const middleware = createMiddleware(env)

  return {
    name: 'notion-api',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}
