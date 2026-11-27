import { Children, useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Reveal } from './Reveal'

/**
 * En móvil: fila deslizable con imán (scroll-snap), a sangre hasta el borde de
 * la pantalla, con la siguiente tarjeta asomando y puntos que marcan cuál se ve.
 * Desde `sm` deja de ser slider y usa la cuadrícula que se pase en `gridClassName`.
 * Cada hijo es un <li>. El conjunto entra con una animación suave al verse.
 */
export function MobileSlider({
  children,
  gridClassName,
  className,
  tone = 'dark',
  label,
}: {
  children: ReactNode
  gridClassName: string
  className?: string
  tone?: 'dark' | 'light'
  label: string
}) {
  const ref = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)
  const count = Children.count(children)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const items = Array.from(el.children) as HTMLElement[]
      const left = el.scrollLeft + el.clientWidth * 0.35
      let i = 0
      items.forEach((item, n) => {
        if (item.offsetLeft - el.offsetLeft <= left) i = n
      })
      // Al llegar al final, el último punto
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) i = items.length - 1
      setActive(i)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (i: number) => {
    const el = ref.current
    const item = el?.children[i] as HTMLElement | undefined
    if (!el || !item) return
    el.scrollTo({ left: item.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: 'smooth' })
  }

  return (
    <Reveal y={28} className={className}>
      <ul
        ref={ref}
        aria-label={label}
        className={cn(
          // Móvil: slider a sangre
          'mx-[calc(var(--shell-gutter)*-1)] flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[var(--shell-gutter)] pb-1 [scroll-padding-inline:var(--shell-gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          '[&>li]:w-[84%] [&>li]:shrink-0 [&>li]:snap-start',
          // Desde sm: cuadrícula normal
          'sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0 sm:[&>li]:w-auto',
          gridClassName,
        )}
      >
        {children}
      </ul>

      {count > 1 && (
        <div className="mt-6 flex justify-center gap-2 sm:hidden">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a la tarjeta ${i + 1} de ${count}`}
              aria-current={i === active}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === active ? 'w-6' : 'w-1.5',
                tone === 'dark'
                  ? i === active ? 'bg-pizarra' : 'bg-pizarra/25'
                  : i === active ? 'bg-nieve' : 'bg-nieve/35',
              )}
            />
          ))}
        </div>
      )}
    </Reveal>
  )
}
