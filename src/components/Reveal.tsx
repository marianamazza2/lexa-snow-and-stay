import type { ReactNode } from 'react'
import { motion } from 'motion/react'

export const ease = [0.22, 1, 0.36, 1] as const

/**
 * Aparición suave al entrar en pantalla: sube unos píxeles y gana opacidad.
 * Se anima una sola vez. Con "reducir movimiento" activado, solo cambia la opacidad.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'p' | 'span'
}) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </Tag>
  )
}

/**
 * Línea de texto que sube desde detrás de una máscara al entrar en pantalla.
 * La detección se hace en el contenedor (siempre visible), no en el texto:
 * el texto empieza oculto bajo la máscara y nunca llegaría a "verse" para activarse.
 */
export function MaskLine({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.span
      className="block overflow-hidden pb-[0.08em]"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: '105%' }, shown: { y: '0%' } }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}
