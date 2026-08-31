import { getPublishedPostBySlug } from '../../server/notion.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const { slug } = req.query
    const post = await getPublishedPostBySlug(process.env, slug)
    if (!post) {
      res.status(404).json({ error: 'Post not found' })
      return
    }
    res.status(200).json({ post })
  } catch (error) {
    console.error('[api/posts/[slug]]', error.body || error.message || error)
    res.status(500).json({
      error:
        error.message ||
        'Could not load posts from Notion. Check that the integration can access the database.',
    })
  }
}
