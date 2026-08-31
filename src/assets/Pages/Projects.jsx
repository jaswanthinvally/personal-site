import React from 'react'
import Layout from '../Components/Layout'
import ProjectCard from '../Components/ProjectCard'
import { PROJECTS } from '../../data/site'

const Projects = () => {
  return (
    <Layout>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Portfolio</p>
      <h1 className="mt-3 font-display text-4xl font-bold text-heading sm:text-5xl">Selected works</h1>
      <div className="mt-12 grid gap-10 sm:gap-12 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Layout>
  )
}

export default Projects
