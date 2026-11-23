import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { cn } from '@/lib/cn'
import { site } from '@/content/site'
import { Logo } from './Logo'
import { InstagramIcon } from './icons'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Barra de navegación.
 * - Sobre el hero: transparente y en blanco.
 * - Al bajar: fondo crema translúcido y texto pizarra (sin cambiar de altura).
 * - En móvil: botón Menú que abre un panel a pantalla completa.
 */
export function Navbar({ overHero = true }: { overHero?: boolean }) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 48))

  // Bloquea el scroll del fondo y cierra con Escape mientras el menú está abierto
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const solid = scrolled || !overHero
  // En otras páginas (fichas) los enlaces de sección llevan a la home
  const base = overHero ? '' : '/'
  const light = !solid && !open

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500',
          'pt-[env(safe-area-inset-top)]',
          solid && !open
            ? 'bg-crema/85 text-pizarra shadow-[0_1px_0_var(--color-escarcha)] backdrop-blur-md'
            : 'bg-transparent',
          light ? 'text-nieve' : 'text-pizarra',
        )}
      >
        <nav
          aria-label="Principal"
          className={cn(
            // Altura fija: al hacer scroll solo cambian el fondo y el color, nada se desplaza
            'shell flex h-[72px] items-center justify-between',
          )}
        >
          <a href={overHero ? '#inicio' : '/'} aria-label="Lexa Snow & Stay, inicio" onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-9 text-[0.92rem] lg:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={base + item.href}
                  className="group relative py-2 tracking-wide opacity-90 transition-opacity hover:opacity-100"
                >
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de Lexa"
              className="grid size-10 place-items-center rounded-full transition-colors hover:bg-current/10"
            >
              <InstagramIcon />
            </a>
            <a
              href={site.bookingUrl}
              className={cn(
                'hidden rounded-full px-5 py-2.5 text-sm font-medium transition-colors lg:inline-flex',
                light
                  ? 'bg-nieve text-pizarra hover:bg-crema'
                  : 'bg-accion text-nieve hover:bg-accion-hover',
              )}
            >
              Reservar clase
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              className="relative flex h-10 items-center gap-3 pl-2 text-sm tracking-wide lg:hidden"
            >
              <span>{open ? 'Cerrar' : 'Menú'}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <motion.span
                  className="absolute left-0 top-0 h-px w-6 bg-current"
                  animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.35, ease }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-px w-6 bg-current"
                  animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.35, ease }}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            className="fixed inset-0 z-40 flex flex-col bg-crema px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-28 text-pizarra lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease }}
          >
            <ul className="flex flex-col gap-1">
              {site.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease }}
                >
                  <a
                    href={base + item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-escarcha py-4 font-serif text-4xl"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-auto grid gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <a
                href={site.bookingUrl}
                onClick={() => setOpen(false)}
                className="rounded-full bg-accion py-4 text-center font-medium text-nieve"
              >
                Reservar clase
              </a>
              <p className="text-center text-sm text-piedra">{site.location}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
