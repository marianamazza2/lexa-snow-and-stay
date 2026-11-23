import { motion } from 'motion/react'
import { ease } from './Reveal'

// Dos vueltas de 0 a 9: cada cifra da una vuelta completa antes de pararse,
// así incluso el 0 se mueve.
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

/**
 * Número tipo "cuentakilómetros": cada cifra es una columna de dígitos que sube
 * desde abajo hasta su valor la primera vez que aparece en pantalla.
 *
 * - Cada fila mide 1.15em para que la tipografía no se recorte.
 * - La detección se hace en el contenedor visible (no en la columna, que está
 *   casi toda oculta por la máscara y nunca contaría como "en pantalla").
 */
export function CountUp({ to, prefix = '', delay = 0 }: { to: number; prefix?: string; delay?: number }) {
  const digits = String(to).split('').map(Number)

  return (
    <motion.span
      className="inline-flex leading-[1.15em]"
      aria-label={`${prefix}${to}`}
      role="img"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
    >
      {prefix && <span aria-hidden className="h-[1.15em]">{prefix}</span>}
      {digits.map((d, i) => (
        <span key={i} aria-hidden className="relative block h-[1.15em] overflow-hidden">
          {/* Reserva el ancho de la cifra final */}
          <span className="invisible block">{d}</span>
          <motion.span
            className="absolute inset-x-0 top-0 flex flex-col text-center"
            variants={{
              hidden: { y: '0%' },
              shown: { y: `-${((10 + d) / DIGITS.length) * 100}%` },
            }}
            transition={{ duration: 1.6 + i * 0.25, delay: delay + i * 0.08, ease }}
          >
            {DIGITS.map((n, k) => (
              <span key={k} className="block h-[1.15em]">
                {n}
              </span>
            ))}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
