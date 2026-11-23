import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { getApartment } from '@/content/apartments'
import { site } from '@/content/site'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Reveal, MaskLine } from '@/components/Reveal'
import { ParallaxImage } from '@/components/ParallaxImage'
import { ArrowRightIcon, BathIcon, BedIcon, UsersIcon } from '@/components/icons'

// Ficha de cada apartamento. Versión inicial: se completará con galería y visor
// a pantalla completa en el siguiente paso.
export const Route = createFileRoute('/apartamentos/$slug')({
  loader: ({ params }) => {
    const apartment = getApartment(params.slug)
    if (!apartment) throw notFound()
    return apartment
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `Apartamento ${loaderData.name} · ${site.name}` },
            { name: 'description', content: loaderData.summary },
            { property: 'og:title', content: `Apartamento ${loaderData.name} · ${site.name}` },
            { property: 'og:description', content: loaderData.summary },
            { property: 'og:image', content: loaderData.images[0]?.src },
          ],
        }
      : {},
  component: ApartmentPage,
})

function ApartmentPage() {
  const apt = Route.useLoaderData()

  return (
    <>
      <Navbar overHero={false} />
      <main className="bg-nieve pt-[72px]">
        <div className="shell pb-24 pt-10 sm:pt-14">
          <Link
            to="/"
            hash="alojamientos"
            className="inline-flex items-center gap-2 text-sm text-piedra transition-colors hover:text-pizarra"
          >
            <ArrowRightIcon width={15} height={15} className="rotate-180" />
            Todos los alojamientos
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-lago">
                  {apt.tagline}
                </p>
              </Reveal>
              <h1 className="mt-5 font-serif text-display text-pizarra">
                <MaskLine>{apt.name}</MaskLine>
              </h1>
            </div>
            <Reveal delay={0.15} className="lg:col-span-5 lg:self-end">
              <p className="text-lead text-piedra">{apt.summary}</p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-3">
            {apt.images.map((img, i) => (
              <ParallaxImage
                key={img.src}
                src={img.src}
                alt={img.alt}
                strength={5}
                className={i === 0 ? 'aspect-[4/3] sm:col-span-2 sm:aspect-auto sm:h-full' : 'aspect-[4/5]'}
              />
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-10 border-t border-escarcha pt-10 lg:flex-row lg:items-center lg:justify-between">
            <ul className="flex flex-wrap gap-x-10 gap-y-4 text-pizarra">
              <Spec icon={UsersIcon} label={`${apt.guests} personas`} />
              <Spec icon={BedIcon} label={`${apt.bedrooms} ${apt.bedrooms === 1 ? 'dormitorio' : 'dormitorios'}`} />
              <Spec icon={BathIcon} label={`${apt.bathrooms} ${apt.bathrooms === 1 ? 'baño' : 'baños'}`} />
            </ul>
            <div className="flex flex-wrap gap-3">
              <a
                href={apt.airbnbUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-accion px-6 py-3 text-sm font-medium text-nieve transition-colors hover:bg-accion-hover"
              >
                Reservar en Airbnb
              </a>
              <a
                href={apt.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-pizarra/30 px-6 py-3 text-sm font-medium text-pizarra transition-colors hover:border-pizarra"
              >
                Reservar en Booking
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer home={false} />
    </>
  )
}

function Spec({ icon: Icon, label }: { icon: typeof UsersIcon; label: string }) {
  return (
    <li className="flex items-center gap-3">
      <Icon className="text-lago" />
      <span>{label}</span>
    </li>
  )
}
