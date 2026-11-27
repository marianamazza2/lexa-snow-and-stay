import { useState, type ReactNode } from 'react'
import { site } from '@/content/site'
import { cn } from '@/lib/cn'
import { Logo } from './Logo'
import { ChevronDownIcon, InstagramIcon } from './icons'

/**
 * Pie de página: marca, navegación, contacto y enlaces legales.
 * En móvil va compacto: y "Explora" y "Contacto"
 * plegados (se abren con la flecha). En las páginas que no son la home, los
 * enlaces de sección llevan a la home.
 */
export function Footer({ home = true }: { home?: boolean }) {
  const base = home ? '' : '/'
  // Anclas de la home (#clases) → en otras páginas apuntan a /#clases; los enlaces externos quedan igual
  const toHome = (href: string) => (href.startsWith('#') ? base + href : href)
  const year = new Date().getFullYear()

  return (
    <footer className="bg-pizarra text-nieve">
      <div className="shell pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-12 sm:pb-[max(2rem,env(safe-area-inset-bottom))] sm:pt-20">
        <div className="grid sm:gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Marca */}
          <div className="pb-8 sm:pb-0 lg:col-span-5">
            <a href={home ? '#inicio' : '/'} aria-label="Lexa Snow & Stay, inicio" className="inline-block">
              <Logo className="h-11 sm:h-16" />
            </a>
            <p className="mt-4 max-w-[36ch] text-sm text-nieve/75 sm:mt-6 sm:text-base">
              Apartamentos y clases de esquí y snowboard en Sierra Nevada.
            </p>
          </div>

          {/* Navegación */}
          <FooterGroup as="nav" title="Explora" id="pie-explora" className="lg:col-span-3">
            <ul className="grid gap-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={toHome(item.href)} className="transition-colors hover:text-glaciar">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterGroup>

          {/* Contacto */}
          <FooterGroup title="Contacto" id="pie-contacto" className="lg:col-span-4">
            <ul className="grid gap-3">
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-glaciar"
                >
                  <InstagramIcon width={18} height={18} />
                  {site.instagramHandle}
                </a>
              </li>
              <li className="text-nieve/75">{site.location}</li>
            </ul>
          </FooterGroup>
        </div>

        {/* Barra inferior */}
        <div className="mt-2 flex flex-col gap-3 border-t border-nieve/20 pt-5 text-xs text-nieve/70 sm:mt-14 sm:gap-4 sm:pt-6 sm:text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.legal.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-nieve">
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

/**
 * Grupo de enlaces del pie. En móvil, plegable: cabecera con flecha a la
 * derecha y la lista se abre al tocar. Desde sm, siempre abierto.
 */
function FooterGroup({
  title,
  id,
  as = 'div',
  className,
  children,
}: {
  title: string
  id: string
  as?: 'div' | 'nav'
  className?: string
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const Tag = as
  return (
    <Tag aria-label={as === 'nav' ? 'Pie de página' : undefined} className={cn('border-t border-nieve/20 sm:border-0', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between py-4 text-left sm:hidden"
      >
        <span className="eyebrow text-glaciar">{title}</span>
        <ChevronDownIcon
          width={20}
          height={20}
          className={cn('text-glaciar transition-transform duration-300', open && 'rotate-180')}
        />
      </button>
      <p className="eyebrow hidden text-glaciar sm:block">{title}</p>
      <div id={id} className={cn('pb-5 sm:mt-5 sm:block sm:pb-0', open ? 'block' : 'hidden')}>
        {children}
      </div>
    </Tag>
  )
}
