import React from 'react'
import Layout from '../Components/Layout'
import { PROFILE_IMAGE } from '../../data/site'

const About = () => {
  return (
    <Layout>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">About</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-heading sm:text-5xl">
        Building products with structure and taste.
      </h1>
      <div className="mt-12 grid items-start gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <img src={PROFILE_IMAGE} alt="Jaswanth" className="w-full rounded-2xl object-cover" />
        <div className="space-y-5 text-base leading-7 text-copy">
          <p>
            I am a full-stack developer based in India. I make web products that are fast, clear,
            and a little more considered than the default template.
          </p>
          <p>
            My work sits between engineering and design: client websites, ecommerce, and the
            systems behind them. I also spend time on Web3 and applied AI when the problem actually
            needs it.
          </p>
          <p>
            Outside of shipping, I write about algorithms, C++, and the tools I am learning — those
            notes live in the log.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About
