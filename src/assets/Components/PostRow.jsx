import React from 'react'
import { Link } from 'react-router-dom'
import { formatLogDate } from '../../lib/dates'

export default function PostRow({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="grid gap-2 border-b border-line py-5 transition hover:bg-card/80 md:grid-cols-[140px_1fr_auto] md:items-center md:gap-8"
    >
      <span className="font-mono text-xs text-muted">{formatLogDate(post.publishedDate)}</span>
      <h3 className="font-display text-xl font-bold text-heading md:text-center">{post.title}</h3>
      <span className="font-mono text-xs text-accent md:text-right">Read Note ↗</span>
    </Link>
  )
}
