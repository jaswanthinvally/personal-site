import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'

export default function ProjectCard({ project }) {
  const media = (
    <div className="overflow-hidden rounded-xl bg-card">
      <img
        src={project.image}
        alt=""
        className="aspect-[4/3] w-full max-w-full object-cover transition duration-500 group-hover:scale-[1.03]"
      />
    </div>
  )

  const title = (
    <h3 className="font-display text-2xl font-bold text-heading">{project.title}</h3>
  )

  return (
    <article className="group">
      {project.href ? (
        <a href={project.href} target="_blank" rel="noreferrer" className="block">
          {media}
        </a>
      ) : (
        media
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {(project.tags || [project.label]).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-pill px-3 py-1 font-mono text-[11px] font-medium text-pill-fg"
          >
            {tag}
          </span>
        ))}
      </div>
      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="mt-3 flex items-start gap-2"
        >
          {title}
          <FiArrowUpRight className="mt-2 shrink-0 text-muted" />
        </a>
      ) : (
        <div className="mt-3">{title}</div>
      )}
      <p className="mt-2 max-w-md text-sm leading-relaxed text-copy">{project.description}</p>
    </article>
  )
}
