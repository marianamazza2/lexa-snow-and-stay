import type { ReactNode } from 'react'
import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { getApartment, mapsUrl, publishedApartments } from '@/content/apartments'
import { classesCta } from '@/content/classes'
import { site } from '@/content/site'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Gallery } from '@/components/Gallery'
import { ApartmentCard } from '@/components/Apartments'
import { Reveal, MaskLine } from '@/components/Reveal'
import { ArrowRightIcon, BathIcon, BedIcon, CheckIcon, PinIcon, UsersIcon } from '@/components/icons'

// Ficha de cada apartamento: galería con visor, descripción, equipamiento,
// camas, información práctica y reserva en Airbnb o Booking.
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
  const others = publishedApartments.filter((a) => a.slug !== apt.slug).slice(0, 3)
  const specs = [
    { icon: UsersIcon, label: `Hasta ${apt.guests} personas` },
    { icon: BedIcon, label: apt.layout[0] },
    { icon: BathIcon, label: apt.layout[1] },
  ]

  return (
    <>
      <Navbar overHero={false} />
      <main className="bg-nieve pt-[72px]">
        {/* Cabecera */}
        <div className="shell pt-8 sm:pt-12">
          <Link
            to="/"
            hash="alojamientos"
            className="inline-flex items-center gap-2 text-sm text-piedra transition-colors hover:text-pizarra"
          >
            <ArrowRightIcon width={15} height={15} className="rotate-180" />
            Todos los alojamientos
          </Link>

          <div className="mt-6 flex flex-col gap-6 pb-8 sm:pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Reveal>
                <p className="eyebrow text-lago">{apt.tagline}</p>
              </Reveal>
              <h1 className="mt-4 font-serif text-[clamp(3rem,7vw,6rem)] font-light leading-[0.95] tracking-[-0.03em] text-pizarra">
                <MaskLine>{apt.name}</MaskLine>
              </h1>
            </div>
            <Reveal delay={0.15}>
              <ul className="flex flex-wrap gap-x-7 gap-y-3 text-pizarra">
                <li className="flex items-center gap-2.5">
                  <PinIcon className="text-lago" />
                  {apt.building}
                </li>
                {specs.map((s) => (
                  <li key={s.label} className="flex items-center gap-2.5">
                    <s.icon className="text-lago" />
                    {s.label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Gallery images={apt.images} name={apt.name} />
        </div>

        {/* Contenido + reserva */}
        <div className="shell grid gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-serif text-[clamp(1.6rem,2.4vw,2.2rem)] font-light leading-snug text-pizarra">
                {apt.summary}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 grid max-w-[64ch] gap-5 text-lead text-piedra">
              {apt.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>

            <Block title="Lo que encontrarás">
              <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {apt.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-3 text-pizarra">
                    <CheckIcon width={18} height={18} className="shrink-0 text-lago" />
                    {a}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Dónde dormirás">
              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {apt.beds.map((b, i) => (
                  <li key={i} className="rounded-2xl border border-escarcha p-5">
                    <BedIcon width={26} height={26} className="text-lago" />
                    <p className="mt-4 font-semibold text-pizarra">{b.room}</p>
                    <p className="mt-1 text-sm text-piedra">{b.detail}</p>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Bueno saber">
              <dl className="grid gap-x-10 sm:grid-cols-2">
                {apt.info.map((s) => (
                  <div key={s.label} className="border-b border-escarcha py-4">
                    <dt className="eyebrow text-piedra">{s.label}</dt>
                    <dd className="mt-1.5 text-pizarra">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <a href={mapsUrl(apt)} target="_blank" rel="noreferrer" className="btn btn-outline mt-8">
                <PinIcon width={18} height={18} />
                Ver en Google Maps
              </a>
            </Block>
          </div>

          {/* Tarjeta de reserva: fija al hacer scroll en escritorio */}
          <aside id="reservar" className="scroll-mt-[96px] lg:col-span-4 lg:col-start-9">
            <div className="rounded-2xl border border-escarcha bg-nieve p-6 shadow-[0_24px_60px_-30px_rgba(36,72,97,0.35)] sm:p-8 lg:sticky lg:top-[104px]">
              <p className="eyebrow text-lago">Reserva</p>
              <p className="mt-3 font-serif text-3xl text-pizarra">{apt.name}</p>
              <ul className="mt-5 grid gap-2.5 border-y border-escarcha py-5 text-sm text-pizarra">
                {specs.map((s) => (
                  <li key={s.label} className="flex items-center gap-2.5">
                    <s.icon width={18} height={18} className="text-lago" />
                    {s.label}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-piedra">Consulta fechas y precio, y reserva en un par de clics.</p>
              <a href={apt.reservaUrl} target="_blank" rel="noreferrer" className="btn btn-primary mt-5 w-full py-4">
                Reservar
              </a>
              <p className="mt-6 border-t border-escarcha pt-5 text-sm text-piedra">
                ¿Tienes dudas?{' '}
                <a href="/#contacto" className="font-semibold text-lago underline underline-offset-4">
                  Escríbenos
                </a>
              </p>
            </div>
          </aside>
        </div>

        {/* Clases: completa la escapada */}
        <div className="shell pb-16 sm:pb-20">
          <Reveal className="grid overflow-hidden rounded-2xl bg-pizarra text-nieve md:grid-cols-2">
            <div className="relative aspect-[16/10] md:aspect-auto">
              <img src={classesCta.image} alt="Esquiador trazando una curva bajo el cielo azul" loading="lazy" className="absolute inset-0 size-full object-cover" />
            </div>
            <div className="flex flex-col items-start gap-5 p-8 sm:p-12 lg:p-16">
              <p className="eyebrow text-glaciar">Completa tu escapada</p>
              <p className="max-w-[16ch] font-serif text-[clamp(2rem,3.4vw,3.25rem)] font-light leading-[1.02]">
                Aprende a esquiar o a hacer snowboard con Lexa
              </p>
              <p className="max-w-[44ch] text-crema">
                Clases privadas de hasta 3 personas, para todos los niveles. Reserva tu hora directamente en la agenda.
              </p>
              <a href="/#clases" className="btn btn-light mt-2">
                Ver clases
                <ArrowRightIcon width={16} height={16} />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Otros alojamientos */}
        {others.length > 0 && (
          <div className="shell pb-24 sm:pb-28">
            <h2 className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-light text-pizarra">Otros alojamientos</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <ApartmentCard apt={o} className="sm:aspect-[4/5] lg:aspect-[4/5]" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <Footer home={false} />

      {/* Móvil: barra fija con el botón de reserva */}
      <div className="h-20 lg:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-escarcha bg-nieve/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
        <div className="shell flex h-20 items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate font-serif text-xl text-pizarra">{apt.name}</p>
            <p className="text-xs text-piedra">Hasta {apt.guests} personas</p>
          </div>
          <a href="#reservar" className="btn btn-primary">
            Reservar
          </a>
        </div>
      </div>
    </>
  )
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal className="mt-14 border-t border-escarcha pt-10">
      <h2 className="mb-7 font-serif text-[clamp(1.6rem,2.2vw,2rem)] text-pizarra">{title}</h2>
      {children}
    </Reveal>
  )
}
