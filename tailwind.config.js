export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        page: 'var(--background)',
        card: 'var(--background-card)',
        heading: 'var(--text-heading)',
        accent: 'var(--text-accent)',
        copy: 'var(--text-body)',
        muted: 'var(--text-muted)',
        line: 'var(--border)',
        pill: 'var(--pill-background)',
        'pill-fg': 'var(--pill-text)',
        code: 'var(--code-background)',
        btn: 'var(--button-background)',
        'btn-fg': 'var(--button-text)',
        'link-hover': 'var(--link-hover)',
        status: 'var(--status-accent)',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
