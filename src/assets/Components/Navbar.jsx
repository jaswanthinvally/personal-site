import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'
import { LINKS } from '../../data/site'

const NAV = [
  { to: '/', label: 'Portfolio' },
  { to: '/blog', label: 'Log' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function NavItems({ onNavigate }) {
  return NAV.map((item) => (
    <NavLink
      key={item.to}
      to={item.to}
      end={item.to === '/'}
      onClick={onNavigate}
      className={({ isActive }) =>
        `font-mono text-[13px] tracking-wide text-copy transition hover:text-heading ${
          isActive ? 'text-heading underline decoration-accent decoration-1 underline-offset-8' : ''
        }`
      }
    >
      {item.label}
    </NavLink>
  ))
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-5 sm:py-5">
        <Link
          to="/"
          className="min-w-0 shrink font-display text-xl font-bold italic leading-none text-heading sm:text-2xl md:text-3xl"
        >
          Jaswanth
        </Link>

        <nav className="hidden items-center gap-6 lg:flex lg:gap-8">
          <NavItems />
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a
            href={LINKS.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-md bg-btn px-4 py-2 font-mono text-xs font-medium tracking-wide text-btn-fg transition hover:opacity-90 lg:inline-flex"
          >
            Resume
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-heading lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="menu-animate flex flex-col gap-4 border-t border-line px-4 py-5 lg:hidden">
          <NavItems onNavigate={() => setOpen(false)} />
          <a
            href={LINKS.resume}
            target="_blank"
            rel="noreferrer"
            className="w-fit rounded-md bg-btn px-4 py-2 font-mono text-xs font-medium text-btn-fg"
          >
            Resume
          </a>
        </div>
      ) : null}
    </header>
  )
}
