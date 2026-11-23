import { useRef } from 'react'
import { motion, type MotionValue, useScroll, useTransform } from 'motion/react'

/**
 * Texto que se "ilumina" palabra a palabra a medida que se hace scroll:
 * empieza tenue y cada palabra gana opacidad en su turno.
 */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')

  return (
    <span ref={ref} className={className}>
      {/* Texto completo para lectores de pantalla */}
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {word}
          </Word>
        ))}
      </span>
    </span>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </>
  )
}
