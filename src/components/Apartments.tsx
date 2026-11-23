import { Link } from '@tanstack/react-router'
import { publishedApartments, type Apartment } from '@/content/apartments'
import { MaskLine, Reveal } from './Reveal'
import { ArrowRightIcon } from './icons'

// Número en letra para el titular («Cuatro casas, una montaña.»)
const numberWords: Record<number, string> = { 2: 'Dos', 3: 'Tres', 4: 'Cuatro', 5: 'Cinco', 6: 'Seis' }

/**
 * Alojamientos: cabecera editorial y los apartamentos en una cuadrícula de dos
 * columnas, todos al mismo tamaño para que ninguno destaque sobre otro.
 * Cada tarjeta es una foto a sangre con el texto encima y lleva a su ficha.
 */
export function Apartments() {
  const total = publishedApartments.length
  const count = numberWords[total]

  return (
    <section
      id="alojamientos"
      aria-labelledby="alojamientos-titulo"
      className="scroll-mt-[72px] bg-nieve py-24 sm:py-28 lg:py-[120px]"
    >
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow text-piedra">Alojamientos</p>
            </Reveal>
            <h2
              id="alojamientos-titulo"
              className="mt-6 font-serif text-[clamp(2.75rem,7vw,6.5rem)] font-light leading-[0.95] tracking-[-0.03em] text-pizarra"
            >
              {count ? (
                <>
                  <MaskLine>{count} casas,</MaskLine>
                  <MaskLine delay={0.1}>
                    <em className="italic">una montaña.</em>
                  </MaskLine>
                </>
              ) : (
                <MaskLine>Tu casa en Sierra Nevada</MaskLine>
              )}
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-[42ch] text-lead text-piedra">
              Cálidos, bien equipados y a pocos pasos de las pistas. Entra en cada uno y reserva directo en Airbnb o
              Booking.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:mt-20">
          {publishedApartments.map((apt, i) => (
            <Reveal key={apt.slug} as="li" delay={(i % 2) * 0.1} y={32}>
              <ApartmentCard apt={apt} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ApartmentCard({ apt }: { apt: Apartment }) {
  const [cover, second] = apt.images
  const rooms = [
    `${apt.bedrooms} ${apt.bedrooms === 1 ? 'dormitorio' : 'dormitorios'}`,
    `${apt.bathrooms} ${apt.bathrooms === 1 ? 'baño' : 'baños'}`,
  ]

  return (
    <Link
      to="/apartamentos/$slug"
      params={{ slug: apt.slug }}
      aria-label={`Apartamento ${apt.name}`}
      className="group relative isolate block aspect-[4/5] overflow-hidden rounded-media bg-lino text-nieve sm:aspect-[4/3] lg:aspect-[3/2]"
    >
      {/* Foto: al pasar el ratón cambia a la segunda */}
      <img
        src={cover.src}
        alt={cover.alt}
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />
      {second && (
        <img
          src={second.src}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full scale-[1.04] object-cover opacity-0 transition-[opacity,transform] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100"
        />
      )}
      {/* Velo en azul de la marca para leer el texto */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#244861]/90 via-[#244861]/45 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 p-6 sm:p-8">
        <div className="flex flex-col gap-2.5">
          <span className="eyebrow">{apt.tagline}</span>
          <h3 className="font-serif text-[clamp(2.25rem,3.8vw,3.5rem)] font-normal leading-[0.95]">{apt.name}</h3>
          <p className="text-sm">
            {rooms.join(' · ')} · Hasta {apt.guests} personas
          </p>
        </div>
        <span className="inline-flex items-center gap-2 whitespace-nowrap border-b border-nieve pb-1 text-sm font-semibold transition-colors duration-300 group-hover:border-glaciar group-hover:text-glaciar">
          Ver apartamento
          <ArrowRightIcon width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
