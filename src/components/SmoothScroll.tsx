import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Scroll suave (inercia ligera) en escritorio con Lenis.
 * - Los enlaces internos (#seccion) también se desplazan con suavidad,
 *   dejando sitio para la navbar fija.
 * - Se desactiva si el sistema pide reducir movimiento.
 * - En pantallas táctiles se mantiene el scroll nativo.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.09,
      anchors: { offset: -72 },
    })

    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    })

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return null
}
