import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { cn } from '@/lib/cn'
import { ease } from './Reveal'

/**
 * Imagen que:
 * 1. se descubre de abajo arriba (cortina) al entrar en pantalla, y
 * 2. se desplaza un poco más lenta que la página al hacer scroll (parallax).
 * Si no hay `src`, muestra `fallback` con el mismo comportamiento.
 *
 * La entrada en pantalla se detecta en el contenedor exterior, que nunca está
 * recortado. Si se detectara en la capa con la cortina (recortada al 100 %),
 * algunos navegadores no la consideran visible y la foto no aparecería nunca.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  fallback,
  strength = 8,
  children,
}: {
  src?: string | null
  alt: string
  className?: string
  fallback?: ReactNode
  /** Desplazamiento máximo en % de la altura */
  strength?: number
  children?: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])

  return (
    <motion.div
      ref={ref}
      className={cn('relative isolate overflow-hidden rounded-media', className)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="absolute inset-0"
        variants={{
          hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
          shown: { clipPath: 'inset(0% 0% 0% 0%)' },
        }}
        transition={{ duration: 1.4, ease }}
      >
        <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
          {src ? (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              // Zoom muy leve si un padre con .group recibe el ratón
              className="size-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            />
          ) : (
            fallback
          )}
        </motion.div>
        {children}
      </motion.div>
    </motion.div>
  )
}
