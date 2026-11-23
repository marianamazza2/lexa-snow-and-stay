import { Children, type ReactNode, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { cn } from '@/lib/cn'

/**
 * Efecto de "capas" encadenadas: cada sección se queda quieta cuando termina de
 * verse, hay un tramo de pausa, y la siguiente sube por encima.
 *
 *   <StackLayers>
 *     <Servicio />      ← se fija; luego la tapa…
 *     <SobreLexa />     ← …esta, que también se fija; luego la tapa…
 *     <ElResto />       ← …el resto de la página (última capa, no se fija)
 *   </StackLayers>
 */
export function StackLayers({ children }: { children: ReactNode }) {
  const layers = Children.toArray(children)
  return (
    <div className="relative">
      {layers.map((layer, i) => (
        <Layer key={i} index={i} last={i === layers.length - 1}>
          {layer}
        </Layer>
      ))}
    </div>
  )
}

function Layer({ children, index, last }: { children: ReactNode; index: number; last: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const nextStart = useRef<HTMLDivElement>(null)
  const [stickyTop, setStickyTop] = useState(0)

  // Si cabe en pantalla se fija arriba; si es más alta, cuando su borde inferior
  // llega al final de la pantalla (así se ve entera antes de que la tapen).
  useEffect(() => {
    const el = ref.current
    if (!el || last) return
    const update = () => setStickyTop(Math.min(0, window.innerHeight - el.offsetHeight))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [last])

  // Avance de la capa siguiente: 0 cuando asoma por abajo, 1 cuando llega arriba
  const { scrollYProgress } = useScroll({ target: nextStart, offset: ['start end', 'start start'] })
  const shade = useTransform(scrollYProgress, [0, 1], [0, 0.45])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  return (
    <>
      <div
        ref={ref}
        style={{ top: last ? undefined : stickyTop, zIndex: index }}
        className={cn(
          last ? 'relative' : 'sticky',
          index > 0 &&
            'overflow-hidden rounded-t-[28px] shadow-[0_-30px_60px_-30px_rgba(28,53,73,0.35)] sm:rounded-t-[40px]',
        )}
      >
        {last ? (
          children
        ) : (
          <>
            <motion.div style={{ scale }} className="origin-bottom">
              {children}
            </motion.div>
            <motion.div
              aria-hidden
              style={{ opacity: shade }}
              className="pointer-events-none absolute inset-0 bg-pizarra"
            />
          </>
        )}
      </div>
      {!last && (
        <>
          {/* Pausa: la capa sigue quieta un tramo antes de que suba la siguiente */}
          <div aria-hidden className="h-[35svh]" />
          <div ref={nextStart} aria-hidden />
        </>
      )}
    </>
  )
}
