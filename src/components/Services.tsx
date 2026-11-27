import { useState } from 'react'
import { service } from '@/content/about'
import { cn } from '@/lib/cn'
import { MobileSlider } from './MobileSlider'
import { Reveal } from './Reveal'
import { ScrollWords } from './ScrollWords'
import { ArrowRightIcon } from './icons'

/**
 * "El servicio": titular grande alineado a la izquierda (la segunda frase en
 * cursiva), el texto (en móvil, con "Ver más") y los tres servicios en
 * tarjetas: en móvil, un slider; en escritorio, en fila.
 */
export function Services() {
  const [lead, end] = service.statement
  const [open, setOpen] = useState(false)
  const [first, ...rest] = service.intro

  return (
    <section id="servicio" aria-labelledby="servicio-titulo" className="bg-nieve py-24 sm:py-28 lg:py-[120px]">
      <div className="shell">
        {/* Cabecera */}
        <Reveal>
          <p className="eyebrow text-piedra">{service.eyebrow}</p>
        </Reveal>
        <h2
          id="servicio-titulo"
          className="mt-8 max-w-[16ch] font-serif text-[clamp(2.6rem,6.2vw,5.75rem)] font-light leading-[1.02] tracking-[-0.025em] text-pizarra lg:max-w-[22ch]"
        >
          <ScrollWords text={lead} /> <ScrollWords text={end} className="italic text-lago" />
        </h2>
        {/* Explicación del servicio, justo debajo del titular. En móvil, el resto tras "Ver más" */}
        <Reveal delay={0.1} className="mt-8 max-w-5xl text-lead text-piedra sm:mt-10">
          <p>{first}</p>
          <div
            id="servicio-mas"
            className={cn('gap-5 sm:mt-5 sm:grid', open ? 'mt-5 grid' : 'hidden')}
          >
            {rest.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {rest.length > 0 && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="servicio-mas"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-lago underline underline-offset-4 sm:hidden"
            >
              {open ? 'Ver menos' : 'Ver más'}
            </button>
          )}
        </Reveal>

        {/* Los tres servicios: tarjetas */}
        <MobileSlider
          label="Servicios"
          className="mt-12 sm:mt-20 lg:mt-24"
          gridClassName="sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {service.points.map((point, i) => (
            <li key={point.title}>
              <a
                href={point.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-escarcha bg-nieve shadow-[0_24px_60px_-34px_rgba(36,72,97,0.35)]"
              >
                <div className="relative isolate aspect-[4/3] overflow-hidden bg-lino lg:aspect-[11/10]">
                  <img
                    src={point.image}
                    alt={point.imageAlt}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-serif text-[1.6rem] italic text-lago">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="eyebrow text-piedra">{point.tag}</span>
                  </div>
                  <h3 className="mt-2 font-serif text-[clamp(1.7rem,2.6vw,2.4rem)] leading-[1.05] text-pizarra">
                    {point.title}
                  </h3>
                  <p className="mb-7 mt-3 leading-relaxed text-piedra">{point.text}</p>
                  <span className="btn btn-primary mt-auto self-start group-hover:bg-accion-hover">
                    {point.cta}
                    <ArrowRightIcon width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </MobileSlider>
      </div>
    </section>
  )
}
