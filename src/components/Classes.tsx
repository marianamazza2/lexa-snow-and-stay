import { motion } from 'motion/react'
import { classModes, classesCta, classesIntro, howItWorks } from '@/content/classes'
import { site } from '@/content/site'
import { ParallaxImage } from './ParallaxImage'
import { MaskLine, Reveal, ease } from './Reveal'
import { ArrowRightIcon, UsersIcon } from './icons'

/**
 * Clases: cabecera, línea de tiempo de cómo reservar (1 → 2 → 3, se va llenando),
 * las cuatro modalidades con foto (tarjetas alineadas de igual altura) y el
 * bloque final con el botón a la agenda de reservas.
 */
export function Classes() {
  return (
    <section id="clases" aria-labelledby="clases-titulo" className="scroll-mt-[72px] bg-nieve">
      <div className="shell py-20 sm:py-28 lg:py-32">
        {/* Cabecera */}
        <div className="max-w-4xl">
          <Reveal>
            <p className="eyebrow text-lago">{classesIntro.eyebrow}</p>
          </Reveal>
          <h2 id="clases-titulo" className="mt-5 font-serif text-title text-pizarra">
            <MaskLine>{classesIntro.title}</MaskLine>
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-[60ch] text-lead text-piedra">{classesIntro.text}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <ul className="mt-6 flex flex-wrap gap-2">
              {['Clases particulares', 'Hasta 3 personas', 'Snowboard y esquí'].map((item) => (
                <li key={item} className="rounded-full border border-pizarra/15 px-4 py-1.5 text-sm text-pizarra">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Línea de tiempo: cómo reservar */}
        <Timeline />

        {/* Modalidades */}
        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {classModes.map((mode, i) => (
            <Reveal key={mode.id} as="li" delay={0.1 + i * 0.08} y={24} className="flex">
              {/* Card: borde fino, foto a todo el ancho y pie con la reserva */}
              <article className="group flex w-full flex-col overflow-hidden rounded-2xl border border-escarcha bg-nieve transition-colors duration-500 hover:border-glaciar">
                <ParallaxImage
                  src={mode.image}
                  alt={mode.imageAlt}
                  strength={5}
                  className="aspect-[4/5] bg-lino"
                >
                  <span className="absolute left-4 top-4 rounded-full bg-accion px-3 py-1.5 text-xs font-medium text-nieve">
                    {mode.discipline}
                  </span>
                </ParallaxImage>

                <div className="flex flex-1 flex-col px-5 pb-4 pt-5 sm:px-6">
                  <span className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-lago">{mode.level}</span>
                  <h3 className="mt-2 line-clamp-2 font-serif text-card text-pizarra">{mode.title}</h3>
                  {/* El pie (mt-auto) queda alineado entre tarjetas aunque un título ocupe dos líneas */}
                  <p className="mb-6 mt-2 line-clamp-3 leading-[1.625rem] text-piedra">{mode.text}</p>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-escarcha pt-4 text-sm">
                    <span className="inline-flex items-center gap-2 text-piedra">
                      <UsersIcon width={16} height={16} className="text-lago" />
                      Hasta 3 personas
                    </span>
                    <a
                      href={site.bookingUrl}
                      className="inline-flex items-center gap-1.5 font-medium text-accion"
                      aria-label={`Reservar clase de ${mode.discipline.toLowerCase()}: ${mode.title}`}
                    >
                      Reservar
                      <ArrowRightIcon width={15} height={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* Reserva */}
        <Reveal className="mt-24">
          <ParallaxImage
            src={classesCta.image}
            alt="Esquiador trazando una curva bajo el cielo azul"
            strength={8}
            className="aspect-[4/5] rounded-[2px] sm:aspect-[16/9] lg:aspect-[21/9]"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,53,73,0.78)_0%,rgba(28,53,73,0.45)_45%,rgba(28,53,73,0.1)_100%)]"
            />
            <div className="absolute inset-0 flex flex-col justify-end gap-5 p-6 text-nieve sm:justify-center sm:p-12 lg:p-16">
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.28em] text-nieve/80">
                <UsersIcon width={15} height={15} />
                Hasta 3 personas por clase
              </span>
              <p className="max-w-[16ch] font-serif text-title">{classesCta.title}</p>
              <p className="max-w-[40ch] text-lead text-nieve/85">{classesCta.text}</p>
              <a
                href={site.bookingUrl}
                className="group mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-nieve px-7 py-3.5 text-sm font-medium text-pizarra transition-colors duration-300 hover:bg-crema"
              >
                Ver horarios y reservar
                <ArrowRightIcon width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </ParallaxImage>
        </Reveal>
      </div>
    </section>
  )
}

const STEP_DELAY = 1.1

/**
 * Línea de tiempo de tres pasos a todo el ancho. Al entrar en pantalla la línea
 * se va llenando y cada círculo se rellena cuando la línea llega a él.
 * En móvil es vertical.
 */
function Timeline() {
  const total = (howItWorks.length - 1) * STEP_DELAY
  const fill = { duration: total, ease: 'linear' as const, delay: 0.3 }
  const dot = (i: number) => ({
    hidden: { backgroundColor: 'rgba(255,255,255,0)', color: '#62686f', borderColor: 'rgba(65,73,81,0.25)' },
    shown: {
      backgroundColor: '#2f5b78',
      color: '#ffffff',
      borderColor: '#2f5b78',
      transition: { duration: 0.4, delay: 0.3 + i * STEP_DELAY },
    },
  })

  return (
    <motion.ol
      className="relative mt-14 grid gap-10 sm:mt-16 md:grid-cols-3 md:gap-8"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Línea base y relleno (horizontal en escritorio) */}
      <span aria-hidden className="absolute left-[16.666%] right-[16.666%] top-6 hidden h-px bg-pizarra/15 md:block" />
      <motion.span
        aria-hidden
        className="absolute left-[16.666%] right-[16.666%] top-6 hidden h-px origin-left bg-accion md:block"
        variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1, transition: fill } }}
      />
      {/* Línea base y relleno (vertical en móvil) */}
      <span aria-hidden className="absolute bottom-12 left-6 top-6 w-px bg-pizarra/15 md:hidden" />
      <motion.span
        aria-hidden
        className="absolute bottom-12 left-6 top-6 w-px origin-top bg-accion md:hidden"
        variants={{ hidden: { scaleY: 0 }, shown: { scaleY: 1, transition: fill } }}
      />

      {howItWorks.map((step, i) => (
        <li key={step.title} className="relative flex gap-5 md:flex-col md:items-center md:gap-0 md:text-center">
          <motion.span
            variants={dot(i)}
            className="relative grid size-12 shrink-0 place-items-center rounded-full border bg-nieve font-serif text-lg"
          >
            {i + 1}
          </motion.span>
          <motion.div
            className="md:mt-5"
            variants={{
              hidden: { opacity: 0, y: 10 },
              shown: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.35 + i * STEP_DELAY, ease } },
            }}
          >
            <p className="pt-2.5 font-serif text-xl text-pizarra md:pt-0">{step.title}</p>
            <p className="mt-2 max-w-[34ch] leading-relaxed text-piedra">{step.text}</p>
          </motion.div>
        </li>
      ))}
    </motion.ol>
  )
}
