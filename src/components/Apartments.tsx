import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import { Link } from '@tanstack/react-router'
import { publishedApartments, type Apartment } from '@/content/apartments'
import { MaskLine, Reveal } from './Reveal'
import { ArrowRightIcon, UsersIcon } from './icons'

// El carrusel es infinito: se pintan tres copias de la lista y, cuando el scroll
// se aleja de la copia central, se salta (sin animación) a la tarjeta equivalente.
const COPIES = 3

/**
 * Alojamientos: cabecera y un carrusel a todo el ancho de la pantalla, con las
 * tarjetas centradas y las vecinas asomando por los lados. Se arrastra con el
 * ratón, se desliza con el dedo o se mueve con las flechas. Cada tarjeta lleva
 * a la ficha del apartamento.
 */
export function Apartments() {
  const trackRef = useRef<HTMLUListElement>(null)
  const total = publishedApartments.length
  const [active, setActive] = useState(0)
  const items = Array.from({ length: COPIES }, (_, copy) =>
    publishedApartments.map((apt, i) => ({ apt, i, copy })),
  ).flat()
  const drag = useDragScroll(trackRef)

  const cards = () => Array.from(trackRef.current?.children ?? []) as HTMLElement[]

  /** Posición de scroll que centra la tarjeta n en pantalla. */
  const centerOf = (n: number) => {
    const track = trackRef.current
    const card = cards()[n]
    if (!track || !card) return 0
    return card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2
  }

  /** Índice (en la lista completa) de la tarjeta más cercana al centro. */
  const nearest = useCallback(() => {
    const track = trackRef.current
    if (!track) return 0
    const mid = track.scrollLeft + track.clientWidth / 2
    let best = 0
    let dist = Infinity
    cards().forEach((c, n) => {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid)
      if (d < dist) {
        dist = d
        best = n
      }
    })
    return best
  }, [])

  /** Si el scroll salió de la copia central, salta a la tarjeta equivalente dentro de ella. */
  const recenter = useCallback(() => {
    const track = trackRef.current
    const all = cards()
    if (!track || all.length < total * COPIES) return
    const n = nearest()
    const copy = Math.floor(n / total)
    if (copy === 1) return
    const shift = all[total].offsetLeft - all[0].offsetLeft
    track.style.scrollSnapType = 'none'
    track.scrollLeft += copy === 0 ? shift : -shift
    requestAnimationFrame(() => {
      track.style.scrollSnapType = ''
    })
  }, [nearest, total])

  // Arranca centrado en la primera tarjeta de la copia central y se recoloca al redimensionar
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const place = () => {
      const i = nearest() % total
      track.style.scrollSnapType = 'none'
      track.scrollLeft = centerOf(total + (Number.isFinite(i) ? i : 0))
      requestAnimationFrame(() => {
        track.style.scrollSnapType = ''
      })
    }
    track.scrollLeft = centerOf(total)
    const ro = new ResizeObserver(place)
    ro.observe(track)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total])

  // Tarjeta activa y salto infinito cuando el scroll se detiene
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let timer = 0
    const onScroll = () => {
      setActive(nearest() % total)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        if (!drag.isDown()) recenter()
      }, 140)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      window.clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nearest, recenter, total])

  const go = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: centerOf(nearest() + dir), behavior: 'smooth' })
  }

  return (
    <section id="alojamientos" aria-labelledby="alojamientos-titulo" className="scroll-mt-[72px] overflow-hidden bg-nieve">
      <div className="shell pt-20 sm:pt-28 lg:pt-32">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <Reveal>
              <p className="eyebrow text-lago">Alojamientos</p>
            </Reveal>
            <h2 id="alojamientos-titulo" className="mt-5 font-serif text-title text-pizarra">
              <MaskLine>Tu casa en Sierra Nevada</MaskLine>
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-[58ch] text-lead text-piedra">
                {total} apartamentos cálidos y bien equipados para descansar después de un día de nieve. Entra en cada
                uno para ver sus fotos y servicios, y reserva directamente en Airbnb o Booking.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.25} className="hidden sm:block">
            <span className="font-serif text-lg tabular-nums text-pizarra" aria-live="polite">
              {String(active + 1).padStart(2, '0')}
              <span className="text-piedra/60"> / {String(total).padStart(2, '0')}</span>
            </span>
          </Reveal>
        </div>
      </div>

      {/* Carrusel a todo el ancho */}
      <Reveal delay={0.2} y={40} className="relative mt-12 sm:mt-16">
        <ul
          ref={trackRef}
          {...drag.handlers}
          aria-label="Apartamentos"
          className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto pb-2 active:cursor-grabbing sm:gap-5"
        >
          {items.map(({ apt, i, copy }) => {
            const clone = copy !== 1
            return (
              <li
                key={`${copy}-${apt.slug}`}
                aria-hidden={clone || undefined}
                className="flex w-[84vw] flex-none snap-center sm:w-[60vw] lg:w-[42vw] xl:w-[31vw]"
              >
                <ApartmentCard apt={apt} index={i} total={total} focusable={!clone} />
              </li>
            )
          })}
        </ul>

        {/* Flechas sobre los bordes, a la altura de las fotos */}
        {/* Alto = ancho de la tarjeta × 0,8 (fotos 5:4), para centrarlas sobre la foto */}
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden items-center sm:flex sm:h-[calc(60vw*0.8)] lg:h-[calc(42vw*0.8)] xl:h-[calc(31vw*0.8)]">
          <div className="flex w-full justify-between px-[max(1rem,2vw)]">
            <ArrowButton label="Apartamento anterior" onClick={() => go(-1)}>
              <ArrowRightIcon width={18} height={18} className="rotate-180" />
            </ArrowButton>
            <ArrowButton label="Apartamento siguiente" onClick={() => go(1)}>
              <ArrowRightIcon width={18} height={18} />
            </ArrowButton>
          </div>
        </div>
      </Reveal>

      <div className="pb-20 sm:pb-28 lg:pb-32" />
    </section>
  )
}

function ApartmentCard({
  apt,
  index,
  total,
  focusable,
}: {
  apt: Apartment
  index: number
  total: number
  focusable: boolean
}) {
  const [cover, second] = apt.images
  const rooms = [
    `${apt.bedrooms} ${apt.bedrooms === 1 ? 'dormitorio' : 'dormitorios'}`,
    `${apt.bathrooms} ${apt.bathrooms === 1 ? 'baño' : 'baños'}`,
  ]

  return (
    <Link
      to="/apartamentos/$slug"
      params={{ slug: apt.slug }}
      draggable={false}
      tabIndex={focusable ? undefined : -1}
      aria-label={focusable ? `Apartamento ${apt.name}, ${index + 1} de ${total}` : undefined}
      className="group flex w-full select-none flex-col overflow-hidden rounded-2xl border border-escarcha bg-nieve transition-colors duration-500 hover:border-glaciar"
    >
      {/* Foto: al pasar el ratón cambia a la segunda */}
      <div className="relative aspect-[5/4] overflow-hidden bg-lino">
        <img
          src={cover.src}
          alt={cover.alt}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
        {second && (
          <img
            src={second.src}
            alt=""
            loading="lazy"
            draggable={false}
            className="absolute inset-0 size-full scale-[1.05] object-cover opacity-0 transition-[opacity,transform] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-4 pt-5 sm:px-6">
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-lago">{apt.tagline}</span>
        <h3 className="mt-2 font-serif text-[1.45rem] leading-tight text-pizarra">{apt.name}</h3>
        <p className="mb-5 mt-2 text-sm text-piedra">{rooms.join(' · ')}</p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-escarcha pt-4 text-sm">
          <span className="inline-flex items-center gap-2 text-piedra">
            <UsersIcon width={16} height={16} className="text-lago" />
            Hasta {apt.guests} personas
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium text-accion">
            Ver apartamento
            <ArrowRightIcon width={15} height={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function ArrowButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="pointer-events-auto grid size-12 place-items-center rounded-full bg-nieve text-pizarra shadow-[0_8px_24px_-8px_rgba(28,53,73,0.35)] transition-[background-color,color,transform] duration-300 hover:scale-105 hover:bg-pizarra hover:text-nieve"
    >
      {children}
    </button>
  )
}

/**
 * Permite arrastrar el carrusel con el ratón (en táctil se usa el scroll nativo).
 * Si hubo arrastre, se anula el clic para no abrir la ficha sin querer.
 */
function useDragScroll(ref: React.RefObject<HTMLUListElement | null>) {
  const state = useRef({ down: false, startX: 0, startLeft: 0, moved: false })

  const release = () => {
    state.current.down = false
    if (ref.current) ref.current.style.scrollSnapType = ''
  }

  return {
    isDown: () => state.current.down,
    handlers: {
      onPointerDown: (e: PointerEvent<HTMLUListElement>) => {
        if (e.pointerType !== 'mouse' || !ref.current) return
        state.current = { down: true, startX: e.clientX, startLeft: ref.current.scrollLeft, moved: false }
        ref.current.style.scrollSnapType = 'none'
      },
      onPointerMove: (e: PointerEvent<HTMLUListElement>) => {
        const s = state.current
        if (!s.down || !ref.current) return
        const dx = e.clientX - s.startX
        if (Math.abs(dx) > 5) s.moved = true
        ref.current.scrollLeft = s.startLeft - dx
      },
      onPointerUp: release,
      onPointerLeave: release,
      onClickCapture: (e: React.MouseEvent) => {
        if (state.current.moved) {
          e.preventDefault()
          e.stopPropagation()
          state.current.moved = false
        }
      },
    },
  }
}
