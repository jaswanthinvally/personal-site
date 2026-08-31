import React from 'react'
import Layout from '../Components/Layout'
import { LINKS } from '../../data/site'

const CHANNELS = [
  { label: 'LinkedIn', href: LINKS.linkedin },
  { label: 'GitHub', href: LINKS.github },
  { label: 'X', href: LINKS.twitter },
  { label: 'LeetCode', href: LINKS.leetcode },
  { label: 'Instagram', href: LINKS.instagram },
]

const Contact = () => {
  return (
    <Layout>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Contact</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-heading sm:text-5xl">
        Let us build something.
      </h1>
      <p className="mt-6 max-w-xl text-copy">
        I am open to product work, websites, and collaborations. The fastest way to reach me is
        LinkedIn.
      </p>
      <ul className="mt-12 divide-y divide-line border-y border-line">
        {CHANNELS.map((channel) => (
          <li key={channel.label}>
            <a
              href={channel.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 py-5 font-display text-xl font-bold text-heading hover:text-accent sm:text-2xl"
            >
              {channel.label}
              <span className="font-mono text-xs text-accent">Open ↗</span>
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Contact
