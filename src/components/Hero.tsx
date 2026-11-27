import type { CSSProperties } from 'react'
import { site } from '@/content/site'
import { ArrowRightIcon } from './icons'

// Foto de la estación de Sierra Nevada en día soleado, guardada en /public/images.
// 1536 × 1024 px, WebP (~186 KB).
const heroImage = '/images/hero-sierra-nevada-3.webp'

const delay = (d: number) => ({ '--d': `${d}s` }) as CSSProperties

// Dato de ambiente para la línea superior (Pradollano). TODO: confirmar con la clienta.
const coordinates = '37°05′ N — 3°23′ O · 2.100 m'

/**
 * Portada editorial: foto a sangre, titular muy grande y, abajo, una franja con
 * el texto, los accesos a Apartamentos y Clases.
 * Las entradas se animan con CSS (funcionan antes de que cargue el JavaScript).
 */
export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex h-svh min-h-[640px] flex-col overflow-hidden text-nieve"
    >
      <img
        src={heroImage}
        width={1536}
        height={1024}
        alt="Pistas y telecabinas de la estación de Sierra Nevada en un día soleado"
        fetchPriority="high"
        className="hero-settle absolute inset-0 -z-10 size-full object-cover object-[62%_center] sm:object-[center_40%]"
      />
      {/* Velos en azul de la marca: arriba para la navbar, abajo para el texto.
          El centro queda limpio para que la nieve se vea blanca */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(36,72,97,0.5)_0%,rgba(36,72,97,0.05)_18%,rgba(36,72,97,0.3)_32%,rgba(36,72,97,0.55)_48%,rgba(36,72,97,0.8)_70%,rgba(36,72,97,0.92)_100%)]" />

      <div className="shell flex flex-1 flex-col pb-5 pt-[104px] sm:pb-6 sm:pt-[128px] [text-shadow:0_1px_14px_rgba(36,72,97,0.35)]">
        <div className="rise eyebrow hidden justify-between text-nieve sm:flex" style={delay(0.1)}>
          <span>{site.location}</span>
          <span>{coordinates}</span>
        </div>

        <div className="mt-auto sm:mt-8">
          <p className="rise eyebrow mb-5 text-nieve sm:hidden" style={delay(0.1)}>
            Sierra Nevada · 2.100 m
          </p>
          <h1 className="font-serif text-hero font-normal tracking-[-0.035em]">
            <span className="line-mask">
              <span className="line-inner" style={delay(0.2)}>La montaña,</span>
            </span>
            <span className="line-mask">
              <span className="line-inner italic sm:pl-[1.2em]" style={delay(0.34)}>sin prisa.</span>
            </span>
          </h1>
        </div>

        <div
          className="rise mt-8 grid grid-cols-2 border-t border-nieve/50 sm:mt-auto lg:grid-cols-3"
          style={delay(0.55)}
        >
          <p className="col-span-2 py-5 text-base leading-relaxed sm:max-w-[40ch] sm:py-7 sm:pr-8 lg:col-span-1 lg:text-[1.05rem]">
            Cuatro apartamentos y clases privadas de esquí y snowboard. Tú subes. Del resto nos ocupamos nosotros.
          </p>

          <HeroLink href="#alojamientos" index="01" label="Dormir" short="Apartamentos" title="Apartamentos" className="lg:border-l lg:px-7" />
          <HeroLink href="#clases" index="02" label="Aprender" short="Clases" title="Clases con Lexa" className="border-l border-nieve/50 pl-4 sm:pl-7 lg:px-7" />

        </div>
      </div>
    </section>
  )
}

function HeroLink({
  href,
  index,
  label,
  short,
  title,
  className = '',
}: {
  href: string
  index: string
  label: string
  short: string
  title: string
  className?: string
}) {
  return (
    <a
      href={href}
      className={`group flex flex-col justify-center gap-2.5 border-nieve/50 py-4 sm:py-7 ${className}`}
    >
      <span className="eyebrow hidden sm:block">
        {index} · {label}
      </span>
      <span className="inline-flex items-center gap-2 whitespace-nowrap font-serif text-[1.35rem] leading-none sm:text-2xl lg:text-[clamp(1.5rem,2.1vw,1.9rem)]">
        <span className="sm:hidden">{short}</span>
        <span className="hidden sm:inline">{title}</span>
        <ArrowRightIcon
          width={22}
          height={22}
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </a>
  )
}
