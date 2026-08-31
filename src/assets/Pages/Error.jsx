import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../Components/Layout'

const Error = () => {
  return (
    <Layout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-heading sm:text-5xl">Page not found</h1>
        <p className="mt-4 max-w-md text-copy">
          The page you are looking for does not exist, or the log entry has not been published.
        </p>
        <Link
          to="/"
          className="mt-8 rounded-md bg-btn px-5 py-3 font-mono text-xs font-medium text-btn-fg"
        >
          Back to portfolio
        </Link>
      </div>
    </Layout>
  )
}

export default Error
