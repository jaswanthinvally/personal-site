import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../Components/Layout'
import SectionHeader from '../Components/SectionHeader'
import ProjectCard from '../Components/ProjectCard'
import PostCard from '../Components/PostCard'
import SocialIcons from '../Components/SocialIcons'
import Intro from '../Components/Intro'
import { LINKS, PROFILE_IMAGE, PROJECTS } from '../../data/site'
import { usePosts } from '../../hooks/usePosts'

const Home = () => {
  const { posts, loading, error } = usePosts()
  const recent = posts.slice(0, 2)

  return (
    <Layout>
      <section className="grid grid-cols-1 items-center gap-6 pb-16 md:grid-cols-2 md:gap-x-12 md:gap-y-6 md:pb-20 lg:gap-x-16">
        <h1 className="hero-animate order-1 max-w-xl overflow-visible pb-1 font-display text-4xl font-bold leading-[1.22] text-heading sm:text-5xl lg:text-6xl">
          I make <em className="italic font-semibold text-accent">full-stack</em> products
          <br />
          that people{' '}
          <span className="inline-flex items-center whitespace-nowrap">
            love
            <span className="inline-block pl-[0.22em] leading-none" aria-hidden>
              ❤️
            </span>
          </span>
        </h1>

        <img
          src={PROFILE_IMAGE}
          alt="Jaswanth"
          className="hero-animate hero-delay-1 order-2 mx-auto aspect-square w-full max-w-[240px] rounded-2xl object-cover sm:max-w-[280px] md:order-1 md:col-start-2 md:row-span-3 md:row-start-1 md:mx-0 md:aspect-auto md:max-h-[420px] md:max-w-none md:w-full"
        />

        <SocialIcons className="hero-animate hero-delay-2 order-3 md:order-3" />

        <div className="hero-animate hero-delay-3 order-4 flex w-full flex-wrap items-center justify-center gap-3 md:order-2 md:justify-start">
          <Link
            to="/projects"
            className="rounded-md bg-btn px-5 py-3 font-mono text-xs font-medium tracking-wide text-btn-fg transition active:scale-[0.98]"
          >
            View Selected Works →
          </Link>
          <a
            href={LINKS.resume}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-line px-5 py-3 font-mono text-xs font-medium tracking-wide text-heading transition hover:border-accent active:scale-[0.98]"
          >
            Resume
          </a>
        </div>
      </section>

      <Intro />

      <section className="pb-16 md:pb-20">
        <SectionHeader title="Log // Recent Writing" action="View All >" to="/blog" />
        {loading && <p className="font-mono text-sm text-muted">Loading notes…</p>}
        {error && <p className="text-sm text-accent">{error}</p>}
        {!loading && !error && recent.length === 0 && (
          <p className="font-mono text-sm text-muted">No published notes yet.</p>
        )}
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2">
          {recent.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Selected Works" action="All Projects" to="/projects" />
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2">
          {PROJECTS.slice(0, 2).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default Home
