import { useEffect, useState } from 'react'
import { fetchJson } from '../lib/api'

export function usePosts() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadPosts() {
      try {
        const data = await fetchJson('/api/posts')
        if (!cancelled) {
          setPosts(data.posts || [])
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadPosts()
    return () => {
      cancelled = true
    }
  }, [])

  return { posts, error, loading }
}
