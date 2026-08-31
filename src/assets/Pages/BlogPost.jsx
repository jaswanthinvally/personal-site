import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../Components/Layout'
import NotionBlocks from '../Components/NotionBlocks'
import { fetchJson } from '../../lib/api'
import { formatLongDate } from '../../lib/dates'

const BlogPost = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadPost() {
      setLoading(true)
      setError('')
      try {
        const data = await fetchJson(`/api/posts/${encodeURIComponent(slug)}`)
        if (!cancelled) {
          setPost(data.post)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          setPost(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadPost()
    return () => {
      cancelled = true
    }
  }, [slug])

  return (
    <Layout>
      <article className="mx-auto max-w-3xl">
        <Link to="/blog" className="font-mono text-xs text-accent hover:text-link-hover">
          ← Back to log
        </Link>

        {loading && <p className="mt-10 font-mono text-sm text-muted">Loading note…</p>}
        {error && <p className="mt-10 text-sm text-accent">{error}</p>}

        {post && (
          <>
            {formatLongDate(post.publishedDate) ? (
              <time
                dateTime={post.publishedDate}
                className="mt-8 block font-mono text-xs uppercase tracking-[0.18em] text-muted"
              >
                {formatLongDate(post.publishedDate)}
              </time>
            ) : null}
            <h1 className="mt-3 font-display text-4xl font-bold text-heading md:text-5xl">
              {post.title}
            </h1>
            {post.tags?.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-btn px-3 py-1 font-mono text-[11px] font-medium text-btn-fg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            {post.featuredImage ? (
              <img
                src={post.featuredImage}
                alt=""
                className="mt-8 w-full rounded-xl object-cover"
              />
            ) : null}
            <p className="mt-6 text-lg leading-8 text-copy">{post.description}</p>
            <div className="mt-8">
              {post.blocks?.length ? (
                <NotionBlocks blocks={post.blocks} />
              ) : (
                <p className="text-muted">This note does not have body content yet.</p>
              )}
            </div>
          </>
        )}
      </article>
    </Layout>
  )
}

export default BlogPost
