import React from 'react'
import { Link } from 'react-router-dom'

export default function SectionHeader({ title, action, to }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-t border-line pt-4">
      <h2 className="min-w-0 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted sm:text-xs sm:tracking-[0.22em]">
        {title}
      </h2>
      {action && to ? (
        <Link
          to={to}
          className="shrink-0 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent hover:text-link-hover sm:text-xs sm:tracking-[0.18em]"
        >
          {action}
        </Link>
      ) : (
        <span className="shrink-0 font-mono text-[11px] text-muted sm:text-xs">{action}</span>
      )}
    </div>
  )
}
