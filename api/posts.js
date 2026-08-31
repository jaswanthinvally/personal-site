import { listPublishedPosts } from '../server/notion.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const posts = await listPublishedPosts(process.env)
    res.status(200).json({ posts })
  } catch (error) {
    console.error('[api/posts]', error.body || error.message || error)
    res.status(500).json({
      error:
        error.message ||
        'Could not load posts from Notion. Check that the integration can access the database.',
    })
  }
}
