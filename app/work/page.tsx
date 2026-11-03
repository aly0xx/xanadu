import { readFileSync } from 'node:fs'
import path from 'node:path'
import Link from 'next/link'
import { CUSTOMERS } from '../../lib/customers'

export const metadata = {
  alternates: { canonical: '/work' },
  title: 'Our Work — Xanadu',
  description:
    'A look at the customers across the Xanadu ecosystem, served by our subsidiaries across MENA and beyond.',
}

/**
 * Display size for a customer logo so every logo covers roughly the same area:
 * wide wordmarks come out shorter, square and tall marks taller. Reads the
 * PNG's own dimensions (IHDR) at build time, so new logos need no tuning.
 */
const LOGO_AREA = 3600
function logoSize(src: string) {
  const png = readFileSync(path.join(process.cwd(), 'public', src))
  const ratio = png.readUInt32BE(16) / png.readUInt32BE(20)
  let height = Math.sqrt(LOGO_AREA / ratio)
  height = Math.min(height, 64, 150 / ratio)
  return { width: Math.round(height * ratio), height: Math.round(height) }
}

export default function WorkPage() {
  return (
    <main className="relative min-h-screen pt-16" style={{ background: 'var(--bg-primary)' }}>
      <article className="section-container pt-16 md:pt-24 pb-24">
        <p
          className="text-sm uppercase tracking-[0.3em] mb-6"
          style={{ color: 'var(--text-muted)' }}
        >
          Our Work
        </p>
        <h1
          className="text-4xl sm:text-5xl font-bold mb-6 leading-tight max-w-2xl"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Xanadu&apos;s portfolio
        </h1>

        {/* ── Customers ── */}
        <section className="mb-20">
          <p className="text-base leading-relaxed mb-8 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Some of the companies our subsidiaries work with across MENA and beyond.
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-10 gap-y-8">
            {CUSTOMERS.map((c) => (
              <li key={c.name} className="flex h-16 items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element -- customer brand logo */}
                <img src={c.logo} alt={c.name} loading="lazy" {...logoSize(c.logo!)} className="object-contain" />
              </li>
            ))}
          </ul>
        </section>

        <div>
          <Link
            href="/contact"
            className="inline-flex items-center mb-12 gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-85"
            style={{
              background: '#3D5A80',
              color: '#fff',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Start a project with us <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>
    </main>
  )
}
