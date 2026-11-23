import { site } from '@/content/site'
import { Logo } from './Logo'
import { ArrowRightIcon, InstagramIcon } from './icons'

/**
 * Pie de página: marca, navegación, contacto y enlaces legales.
 * En las páginas que no son la home, los enlaces de sección llevan a la home.
 */
export function Footer({ home = true }: { home?: boolean }) {
  const base = home ? '' : '/'
  // Anclas de la home (#clases) → en otras páginas apuntan a /#clases; los enlaces externos quedan igual
  const toHome = (href: string) => (href.startsWith('#') ? base + href : href)
  const year = new Date().getFullYear()

  return (
    <footer className="bg-crema text-pizarra">
      <div className="shell pb-[max(2rem,env(safe-area-inset-bottom))] pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Marca */}
          <div className="lg:col-span-5">
            <a href={home ? '#inicio' : '/'} aria-label="Lexa Snow & Stay, inicio" className="inline-block">
              <Logo />
            </a>
            <p className="mt-6 max-w-[36ch] text-piedra">
              Apartamentos y clases de esquí y snowboard en Sierra Nevada. Tú solo vienes a disfrutar de la nieve.
            </p>
            <a
              href={toHome(site.bookingUrl)}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-accion px-6 py-3 text-sm font-medium text-nieve transition-colors hover:bg-accion-hover"
            >
              Reservar clase
              <ArrowRightIcon width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Navegación */}
          <nav aria-label="Pie de página" className="lg:col-span-3">
            <p className="eyebrow text-lago">Explora</p>
            <ul className="mt-5 grid gap-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={toHome(item.href)} className="transition-colors hover:text-accion">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div className="lg:col-span-4">
            <p className="eyebrow text-lago">Contacto</p>
            <ul className="mt-5 grid gap-3">
              <li>
                <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-accion">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-accion"
                >
                  <InstagramIcon width={18} height={18} />
                  {site.instagramHandle}
                </a>
              </li>
              <li className="text-piedra">{site.location}</li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-14 flex flex-col gap-4 border-t border-escarcha pt-6 text-sm text-piedra sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.legal.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-pizarra">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
