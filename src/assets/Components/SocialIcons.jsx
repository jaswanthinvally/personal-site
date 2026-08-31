import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { SiLeetcode } from 'react-icons/si'
import { LINKS } from '../../data/site'

const SOCIALS = [
  { label: 'LinkedIn', href: LINKS.linkedin, Icon: FaLinkedin },
  { label: 'X', href: LINKS.twitter, Icon: FaSquareXTwitter },
  { label: 'GitHub', href: LINKS.github, Icon: FaGithub },
  { label: 'LeetCode', href: LINKS.leetcode, Icon: SiLeetcode },
]

export default function SocialIcons({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 md:justify-start ${className}`}>
      {SOCIALS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-heading transition hover:border-accent hover:text-accent active:scale-95"
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  )
}
