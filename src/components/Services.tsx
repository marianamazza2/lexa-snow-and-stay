import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { service } from '@/content/about'
import { cn } from '@/lib/cn'
import { Reveal, ease } from './Reveal'
import { ScrollWords } from './ScrollWords'
import { ArrowRightIcon } from './icons'

const points = service.points
const n = points.length

/**
 * "El servicio": título y descripción arriba; debajo, las opciones a la izquierda
 * y una imagen a la derecha.
 * - Escritorio: la sección se queda fija mientras se hace scroll y cada tramo
 *   activa una opción; la imagen de la derecha cambia con ella. También se puede
 *   hacer clic en una opción para ir a su tramo.
 * - Móvil: las opciones se apilan, cada una con su imagen.
 */
export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  // 0 cuando la sección llega arriba, 1 cuando termina el tramo fijo
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(p * n))))
  })

  // Lleva el scroll al centro del tramo de la opción elegida
  const goTo = (i: number) => {
    const el = sectionRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const range = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + ((i + 0.5) / n) * range, behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="servicio"
      aria-labelledby="servicio-titulo"
      // Alto extra en escritorio = tramo de scroll en el que la sección queda fija
      className="relative overflow-x-clip bg-nieve lg:h-[260svh]"
    >
      <div className="flex flex-col justify-center py-20 sm:py-24 lg:sticky lg:top-0 lg:h-svh lg:py-0 lg:pt-[72px]">
        <div className="shell">
          {/* Cabecera */}
          <div className="mx-auto max-w-5xl text-center">
            <Reveal>
              <p className="eyebrow text-lago">{service.eyebrow}</p>
            </Reveal>
            <h2 id="servicio-titulo" className="mx-auto mt-5 max-w-[34ch] text-balance font-serif text-title text-pizarra lg:text-[clamp(2.2rem,min(4.6vw,6.2svh),4rem)]">
              <ScrollWords text={service.statement} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-[72ch] text-lead text-piedra">{service.intro}</p>
            </Reveal>
          </div>

          {/* Escritorio: opciones + imagen que cambia */}
          <div className="mt-[min(5svh,4rem)] hidden items-center gap-16 lg:grid lg:grid-cols-12">
            <ol className="col-span-5 border-t border-escarcha">
              {points.map((point, i) => {
                const on = i === active
                return (
                  <li key={point.title} className="border-b border-escarcha">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={on || undefined}
                      className={cn(
                        'relative flex w-full flex-col py-[min(2.6svh,1.5rem)] pl-6 pr-2 text-left transition-colors duration-500',
                        on ? 'text-pizarra' : 'text-pizarra/45 hover:text-pizarra/75',
                      )}
                    >
                      {/* Marca lateral de la opción activa */}
                      <span
                        aria-hidden
                        className={cn(
                          'absolute inset-y-0 left-0 w-px origin-top bg-accion transition-transform duration-500',
                          on ? 'scale-y-100' : 'scale-y-0',
                        )}
                      />
                      <span className="flex items-center gap-5">
                        <span className="w-6 font-serif text-sm tabular-nums text-lago">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1 font-serif text-[clamp(1.35rem,min(2vw,3.2svh),2rem)] leading-tight">
                          {point.title}
                        </span>
                        <ArrowRightIcon
                          width={18}
                          height={18}
                          className={cn(
                            'text-accion transition-all duration-500',
                            on ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0',
                          )}
                        />
                      </span>
                      {/* Descripción: se despliega en la opción activa */}
                      <span
                        className={cn(
                          'grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                          on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="block max-w-[46ch] pl-11 pt-3 text-[0.98rem] leading-relaxed text-piedra">
                            {point.text}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <div className="relative col-span-6 col-start-7 h-[min(44svh,580px)] overflow-hidden rounded-2xl bg-lino">
              {points.map((point, i) => (
                <motion.img
                  key={point.image}
                  src={point.image}
                  alt={i === active ? point.imageAlt : ''}
                  aria-hidden={i !== active || undefined}
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
                  transition={{ duration: 0.9, ease }}
                  className="absolute inset-0 size-full object-cover"
                />
              ))}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-pizarra/70 via-pizarra/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease }}
                >
                  <span className="inline-flex rounded-full bg-accion px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-nieve">
                    {String(active + 1).padStart(2, '0')} · {points[active].tag}
                  </span>
                  <p className="mt-3 font-serif text-[1.7rem] leading-tight text-nieve">{points[active].title}</p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Móvil y tablet: cada opción con su imagen */}
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:hidden">
            {points.map((point, i) => (
              <Reveal key={point.title} as="li" delay={i * 0.08} y={20} className={cn(i === n - 1 && 'sm:col-span-2')}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-lino">
                  <img src={point.image} alt={point.imageAlt} loading="lazy" className="absolute inset-0 size-full object-cover" />
                  <span className="absolute left-4 top-4 inline-flex rounded-full bg-accion px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-nieve">
                    {String(i + 1).padStart(2, '0')} · {point.tag}
                  </span>
                </div>
                <p className="mt-5 font-serif text-card text-pizarra">{point.title}</p>
                <p className="mt-2 leading-relaxed text-piedra">{point.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
