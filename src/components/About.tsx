import { motion } from 'motion/react'
import { about } from '@/content/about'
import { site } from '@/content/site'
import { CountUp } from './CountUp'
import { ParallaxImage } from './ParallaxImage'
import { MaskLine, Reveal, ease } from './Reveal'
import { ArrowRightIcon } from './icons'

// TODO: foto de Lexa (vertical, 4:5). Guardarla en /public/images y poner aquí la ruta.
const portrait: string | null = null

/**
 * "Sobre Lexa": retrato rectangular que se descubre y se desplaza con parallax,
 * presentación, cita y datos con números que suben como un cuentakilómetros.
 */
export function About() {
  return (
    <section id="lexa" aria-labelledby="lexa-titulo" className="relative flex min-h-svh scroll-mt-[72px] items-center overflow-hidden bg-crema">
      <div className="shell grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:py-14">
        {/* Retrato */}
        <div className="mx-auto w-[82%] max-w-md lg:col-span-5 lg:w-full lg:max-w-[min(100%,calc((100svh-8rem)*0.8))]">
          <div className="relative">
            {/* Marco fino que se desplaza detrás de la foto */}
            <motion.div
              aria-hidden
              className="absolute inset-0 border border-pizarra/25"
              initial={{ opacity: 0, x: 0, y: 0 }}
              whileInView={{ opacity: 1, x: 22, y: 22 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.4, delay: 0.6, ease }}
            />
            <ParallaxImage
              src={portrait}
              alt="Lexa, instructora de snowboard y esquí, en Sierra Nevada"
              className="aspect-[4/5] rounded-[2px] bg-lino"
              strength={6}
              fallback={<PortraitPlaceholder />}
            />
            {/* Sello circular giratorio */}
            <motion.div
              aria-hidden
              className="absolute -bottom-8 -left-4 sm:-left-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.9, ease }}
            >
              <Seal />
            </motion.div>
          </div>
        </div>

        {/* Texto */}
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="eyebrow text-lago">
              {about.eyebrow}
            </p>
          </Reveal>
          <h2
            id="lexa-titulo"
            className="mt-5 font-serif text-title text-pizarra"
          >
            <MaskLine>{about.title}</MaskLine>
          </h2>

          <div className="mt-6 grid max-w-[58ch] gap-4 text-base leading-relaxed text-piedra">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.15 + i * 0.1} as="p">
                {p}
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <blockquote className="relative mt-7 pl-8 font-serif text-xl leading-snug text-pizarra">
              <motion.span
                aria-hidden
                className="absolute left-0 top-0 h-full w-px origin-top bg-lago/50"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease }}
              />
              «{about.quote}»
            </blockquote>
          </Reveal>

          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-escarcha pt-6 sm:gap-8">
            {about.facts.map((f, i) => (
              <Reveal key={f.label} delay={0.35 + i * 0.1} y={12}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-serif text-4xl text-pizarra sm:text-5xl">
                  <CountUp to={f.value} prefix={f.prefix} delay={0.2 + i * 0.15} />
                </dd>
                <dd aria-hidden className="mt-2 text-xs leading-snug text-piedra sm:text-sm">
                  {f.label}
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.5} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={site.bookingUrl}
              className="group relative inline-flex items-center overflow-hidden rounded-full bg-accion px-7 py-3.5 text-sm font-medium text-nieve"
            >
              {/* Relleno que sube al pasar el ratón */}
              <span className="absolute inset-0 translate-y-full rounded-full bg-pizarra transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
              <span className="relative">Reservar una clase</span>
            </a>
            <a href="#clases" className="group inline-flex items-center gap-2 text-sm font-medium text-lago">
              <span className="relative">
                Conoce las clases
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-lago transition-transform duration-500 group-hover:scale-x-100" />
              </span>
              <ArrowRightIcon width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/** Sello circular con texto que gira lentamente. */
function Seal() {
  return (
    <div className="relative grid size-28 place-items-center rounded-full bg-nieve shadow-[0_20px_50px_-25px_rgba(28,53,73,0.45)] sm:size-36">
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-2 size-[calc(100%-1rem)] text-pizarra"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        <defs>
          <path id="seal-circle" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
        </defs>
        <text className="fill-current text-[8px] uppercase" style={{ fontFamily: 'var(--font-sans)' }}>
          {/* textLength reparte las letras justo en la circunferencia (2π·38 ≈ 238) */}
          <textPath href="#seal-circle" textLength="236" lengthAdjust="spacing">
            Instructora · Snowboard · Esquí ·
          </textPath>
        </text>
      </motion.svg>
      <svg viewBox="0 0 24 24" className="size-6 text-lago sm:size-7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        <path d="m2.5 19 7-11 4 6 2.5-3.5L21.5 19z" />
      </svg>
    </div>
  )
}

function PortraitPlaceholder() {
  return (
    <div className="flex size-full flex-col items-center justify-end bg-gradient-to-b from-glaciar/70 via-lino to-crema pb-[18%] text-center">
      <svg aria-hidden viewBox="0 0 200 80" className="mb-8 w-1/2 text-nieve/70" fill="currentColor">
        <path d="M0 80 L45 38 L70 55 L105 15 L140 50 L160 36 L200 70 L200 80 Z" />
      </svg>
      <span className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-piedra">
        Foto de Lexa
      </span>
    </div>
  )
}
