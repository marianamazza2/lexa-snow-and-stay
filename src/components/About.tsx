import { about } from '@/content/about'
import { site } from '@/content/site'
import { ParallaxImage } from './ParallaxImage'
import { MaskLine, Reveal } from './Reveal'
import { ArrowRightIcon } from './icons'

// TODO: foto de Lexa (vertical, 4:5). Guardarla en /public/images y poner aquí la ruta.
const portrait: string | null = null

/**
 * "Sobre Lexa": retrato vertical a la izquierda; a la derecha la cita como
 * titular grande, una presentación breve y los datos en números enormes.
 */
export function About() {
  const [quoteStart, quoteEnd] = about.quote.split(about.quoteHighlight)

  return (
    <section
      id="lexa"
      aria-labelledby="lexa-titulo"
      className="relative flex min-h-svh scroll-mt-[72px] items-center overflow-hidden bg-crema"
    >
      <div className="shell grid items-center gap-14 py-24 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:py-20">
        {/* Retrato */}
        <div className="lg:col-span-5 lg:max-w-[min(100%,calc((100svh-10rem)*0.8))]">
          <div className="relative">
            <ParallaxImage
              src={portrait}
              alt="Lexa, instructora de snowboard y esquí, en Sierra Nevada"
              className="aspect-[4/5] bg-lino"
              strength={6}
              fallback={<PortraitPlaceholder />}
            />
            <p className="eyebrow absolute bottom-5 left-5 text-pizarra">{about.portraitCaption}</p>
          </div>
        </div>

        {/* Texto */}
        <div className="flex flex-col lg:col-span-7 lg:pl-8">
          <Reveal>
            <p className="eyebrow text-piedra">{about.eyebrow}</p>
          </Reveal>
          <h2 id="lexa-titulo" className="sr-only">
            {about.title}
          </h2>

          <blockquote className="mt-7 font-serif text-[clamp(2.2rem,4.4vw,4rem)] font-light leading-[1.05] tracking-[-0.02em] text-pizarra">
            <MaskLine>
              «{quoteStart}
              <em className="italic text-lago">{about.quoteHighlight}</em>
              {quoteEnd}»
            </MaskLine>
          </blockquote>

          <Reveal delay={0.15}>
            <p className="mt-7 max-w-[52ch] text-lead text-piedra">{about.intro}</p>
          </Reveal>

          <dl className="mt-12 grid grid-cols-3 border-t border-pizarra lg:mt-14">
            {about.facts.map((f, i) => (
              <Reveal
                key={f.label}
                delay={0.25 + i * 0.1}
                y={16}
                className={i > 0 ? 'border-l border-escarcha pl-4 pt-6 sm:pl-6' : 'pr-4 pt-6 sm:pr-6'}
              >
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-serif text-[clamp(3.25rem,7.5vw,7rem)] font-light leading-[0.85] tracking-[-0.04em] text-pizarra">
                  {f.value}
                  {f.suffix && <span className="text-lago">{f.suffix}</span>}
                </dd>
                <dd aria-hidden className="mt-3 text-xs leading-snug text-piedra sm:text-sm">
                  {f.label}
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.5} className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
            <a
              href={site.bookingUrl}
              className="group inline-flex items-center gap-2 whitespace-nowrap border-b border-pizarra pb-1 text-sm font-semibold text-pizarra transition-colors duration-300 hover:border-lago hover:text-lago"
            >
              Reservar una clase
              <ArrowRightIcon width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#clases"
              className="text-sm font-medium text-piedra underline-offset-4 transition-colors hover:text-lago hover:underline"
            >
              Conoce las clases
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function PortraitPlaceholder() {
  return (
    <div className="flex size-full flex-col items-center justify-center bg-gradient-to-b from-glaciar/60 via-lino to-lino text-center">
      <svg aria-hidden viewBox="0 0 200 80" className="mb-6 w-1/2 text-nieve/80" fill="currentColor">
        <path d="M0 80 L45 38 L70 55 L105 15 L140 50 L160 36 L200 70 L200 80 Z" />
      </svg>
      <span className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-piedra">Foto de Lexa</span>
    </div>
  )
}
