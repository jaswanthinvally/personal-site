import React from 'react'
import { FaCode, FaEthereum } from 'react-icons/fa'
import { MdDesignServices } from 'react-icons/md'
import { AiOutlineOpenAI } from 'react-icons/ai'
import SectionHeader from './SectionHeader'

const ROLES = [
  {
    title: 'Developer',
    Icon: FaCode,
    blurb: 'Full-stack web products that are fast, clear, and built to last.',
  },
  {
    title: 'Web3 Engineer',
    Icon: FaEthereum,
    blurb: 'On-chain systems when the problem actually needs them.',
  },
  {
    title: 'AI enthusiast',
    Icon: AiOutlineOpenAI,
    blurb: 'Applied AI in real product workflows — not throwaway demos.',
  },
  {
    title: 'Designer',
    Icon: MdDesignServices,
    blurb: 'Interfaces with structure, restraint, and a bit of taste.',
  },
]

export default function Intro() {
  return (
    <section className="pb-16 md:pb-20">
      <SectionHeader title="Who am I" action="More About Me" to="/about" />

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <p className="max-w-xl font-display text-2xl font-bold leading-snug text-heading sm:text-3xl">
            Building products with{' '}
            <em className="italic font-semibold text-accent">structure and taste</em>.
          </p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-copy sm:text-base">
            I am a full-stack developer based in India. My work sits between engineering and
            design: client sites, ecommerce, and the systems behind them.
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {ROLES.map(({ title, Icon, blurb }) => (
            <li
              key={title}
              className="flex gap-3 rounded-xl border border-line bg-card p-4 transition hover:border-accent"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pill text-accent">
                <Icon size={18} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-sans text-sm font-semibold text-heading">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted sm:text-[13px]">{blurb}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
