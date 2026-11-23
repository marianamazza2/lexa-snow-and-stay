import type { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

/** Plantilla común de las páginas legales (aviso legal, privacidad, cookies). */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <Navbar overHero={false} />
      <main className="bg-nieve pt-[72px]">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
          <p className="eyebrow text-lago">Legal</p>
          <h1 className="mt-5 font-serif text-title text-pizarra">{title}</h1>
          <div className="mt-6 text-lead text-piedra">{children}</div>
        </div>
      </main>
      <Footer home={false} />
    </>
  )
}
