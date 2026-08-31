import React from 'react'
import Layout from '../Components/Layout'
import PostRow from '../Components/PostRow'
import { usePosts } from '../../hooks/usePosts'

const Blog = () => {
  const { posts, error, loading } = usePosts()

  return (
    <Layout>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Log</p>
      <h1 className="mt-3 font-display text-4xl font-bold text-heading sm:text-5xl">
        Recent writing
      </h1>
      <p className="mt-4 max-w-xl text-copy">
        Notes on building, algorithms, and what I am learning.
      </p>

      {loading && <p className="mt-10 font-mono text-sm text-muted">Loading notes…</p>}
      {error && <p className="mt-10 text-sm text-accent">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="mt-10 font-mono text-sm text-muted">No published notes yet.</p>
      )}

      <div className="mt-10">
        {posts.map((post) => (
          <PostRow key={post.id} post={post} />
        ))}
      </div>
    </Layout>
  )
}

export default Blog
