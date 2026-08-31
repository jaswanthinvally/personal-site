import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'

export default function PostCard({ post }) {
  return (
    <article className="group">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="overflow-hidden rounded-xl bg-card">
          {post.featuredImage ? (
            <img
              src={post.featuredImage}
              alt=""
              className="aspect-[4/3] w-full max-w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex aspect-[4/3] items-center bg-card px-6">
              <p className="font-display text-2xl font-bold text-heading">{post.title}</p>
            </div>
          )}
        </div>
      </Link>
      {post.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-pill px-3 py-1 font-mono text-[11px] font-medium text-pill-fg"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <Link to={`/blog/${post.slug}`} className="mt-3 flex items-start gap-2">
        <h3 className="font-display text-2xl font-bold text-heading">{post.title}</h3>
        <FiArrowUpRight className="mt-2 shrink-0 text-muted" />
      </Link>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-copy">{post.description}</p>
    </article>
  )
}
