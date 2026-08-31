import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-page text-copy">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-5 sm:pb-20 sm:pt-10 md:pt-14">
        {children}
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p>© {new Date().getFullYear()} Jaswanth</p>
          <Link to="/contact" className="text-accent hover:text-link-hover">
            Contact
          </Link>
        </div>
      </footer>
    </div>
  )
}
