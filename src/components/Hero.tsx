import type { CSSProperties } from 'react'
import { site } from '@/content/site'
import { ArrowRightIcon } from './icons'

// Foto de la estación de Sierra Nevada en día soleado, guardada en /public/images.
// 1536 × 1024 px, WebP (~186 KB).
const heroImage = '/images/hero-sierra-nevada-3.webp'

const delay = (d: number) => ({ '--d': `${d}s` }) as CSSProperties

/**
 * Portada: foto a sangre, titular, texto y dos llamadas a la acción.
 * Las entradas se animan con CSS (funcionan antes de que cargue el JavaScript)
 * y nada se mueve al hacer scroll.
 */
export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex h-svh min-h-[560px] items-center overflow-hidden text-nieve"
    >
      <img
        src={heroImage}
        width={1536}
        height={1024}
        alt="Pistas y telecabinas de la estación de Sierra Nevada en un día soleado"
        fetchPriority="high"
        // En escritorio la imagen es un 18 % más ancha que la portada y se ancla a la
        // izquierda, así queda desplazada hacia la derecha.
        className="hero-settle absolute inset-0 -z-10 size-full origin-top object-cover object-[58%_48%] sm:w-[118%] sm:max-w-none sm:object-[0%_48%]"
      />
      {/* Velos para asegurar la lectura del texto y de la navbar */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1c3549]/30 via-transparent via-25% to-transparent" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(28,53,73,0.68)_0%,rgba(28,53,73,0.55)_28%,rgba(28,53,73,0.2)_50%,rgba(28,53,73,0)_62%)]" />
      {/* Velo diagonal desde la esquina inferior derecha: cubre torres y telecabinas
          y se desvanece hacia el centro, que queda como la zona más luminosa */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_130%_at_100%_100%,rgba(28,53,73,0.88)_0%,rgba(28,53,73,0.7)_35%,rgba(28,53,73,0.38)_65%,rgba(28,53,73,0)_100%)]" />
      {/* Velo difuso centrado en el texto. Ocupa toda la portada para que el degradado
          se desvanezca sin bordes ni líneas visibles */}
      <div aria-hidden className="absolute inset-0 -z-10 hidden bg-[radial-gradient(ellipse_55%_70%_at_18%_58%,rgba(28,53,73,0.6)_0%,rgba(28,53,73,0.35)_40%,rgba(28,53,73,0)_100%)] sm:block" />
      {/* En móvil el texto ocupa todo el ancho: velo uniforme algo más marcado */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#1c3549]/50 sm:hidden" />

      <div className="shell pt-16 [text-shadow:0_1px_14px_rgba(28,53,73,0.45)]">
        <div className="relative max-w-2xl">
          <p className="rise eyebrow text-nieve/85" style={delay(0.1)}>
            {site.location}
          </p>

          <h1 className="mt-5 font-serif text-display">
            <span className="line-mask">
              <span className="line-inner" style={delay(0.2)}>Tu escapada</span>
            </span>
            <span className="line-mask">
              <span className="line-inner" style={delay(0.34)}>a la nieve</span>
            </span>
          </h1>

          <p className="rise mt-6 max-w-[38ch] text-base leading-relaxed text-nieve sm:text-lg" style={delay(0.45)}>
            Apartamentos y clases de esquí y snowboard en Sierra Nevada, para vivir la montaña con calma y sin preocupaciones.
          </p>

          <div className="rise mt-9 flex flex-wrap gap-3" style={delay(0.6)}>
            <a
              href="#alojamientos"
              className="group inline-flex items-center gap-2 rounded-full bg-nieve px-6 py-3 text-sm font-medium text-pizarra transition-colors duration-300 hover:bg-crema"
            >
              Ver alojamientos
              <ArrowRightIcon width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#clases"
              className="inline-flex items-center rounded-full border border-nieve/70 px-6 py-3 text-sm font-medium text-nieve backdrop-blur-[2px] transition-colors duration-300 hover:bg-nieve/15"
            >
              Clases de esquí y snowboard
            </a>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#servicio"
        aria-label="Bajar a la siguiente sección"
        className="rise absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-nieve/80 sm:flex"
        style={delay(1.1)}
      >
        Descubre
        <span className="relative block h-12 w-px overflow-hidden bg-nieve/25">
          <span className="scroll-cue absolute inset-0 bg-nieve" />
        </span>
      </a>
    </section>
  )
}
