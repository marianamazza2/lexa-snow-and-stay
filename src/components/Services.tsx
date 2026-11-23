import { service } from '@/content/about'
import { Reveal } from './Reveal'
import { ScrollWords } from './ScrollWords'
import { ArrowRightIcon } from './icons'

/**
 * "El servicio": titular grande alineado a la izquierda (la segunda frase en
 * cursiva) y debajo los tres servicios a la vista, cada uno con su foto,
 * número, título, texto y enlace. Sin pasos ocultos: se entiende de un vistazo.
 */
export function Services() {
  const [lead, end] = service.statement

  return (
    <section id="servicio" aria-labelledby="servicio-titulo" className="bg-nieve py-24 sm:py-28 lg:py-[120px]">
      <div className="shell">
        {/* Cabecera */}
        <Reveal>
          <p className="eyebrow text-piedra">{service.eyebrow}</p>
        </Reveal>
        <h2
          id="servicio-titulo"
          className="mt-8 max-w-[16ch] font-serif text-[clamp(2.6rem,6.2vw,5.75rem)] font-light leading-[1.02] tracking-[-0.025em] text-pizarra lg:max-w-[22ch]"
        >
          <ScrollWords text={lead} /> <ScrollWords text={end} className="italic text-lago" />
        </h2>
        {/* Explicación del servicio, justo debajo del titular */}
        <Reveal delay={0.1} className="mt-10 grid max-w-5xl gap-5 text-lead text-piedra">
          {service.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>

        {/* Los tres servicios */}
        <ol className="mt-16 grid gap-14 sm:mt-20 sm:grid-cols-2 sm:gap-x-10 lg:mt-24 lg:grid-cols-3 lg:gap-12">
          {service.points.map((point, i) => (
            <Reveal key={point.title} as="li" delay={i * 0.1} y={28}>
              <a href={point.href} className="group flex h-full flex-col">
                <div className="relative isolate aspect-[4/3] overflow-hidden rounded-media bg-lino sm:aspect-[4/5] lg:aspect-[11/12]">
                  <img
                    src={point.image}
                    alt={point.imageAlt}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>

                <div className="mt-7 flex flex-1 flex-col border-t border-pizarra pt-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-serif text-[1.75rem] italic text-lago">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="eyebrow text-piedra">{point.tag}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-[clamp(1.9rem,2.6vw,2.4rem)] leading-[1.05] text-pizarra">
                    {point.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-piedra">{point.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 self-start whitespace-nowrap border-b border-pizarra pb-1 text-sm font-semibold text-pizarra transition-colors duration-300 group-hover:border-lago group-hover:text-lago">
                    {point.cta}
                    <ArrowRightIcon width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
