import {
  classModes,
  classesCta,
  classesIntro,
  howItWorks,
} from "@/content/classes";
import { site } from "@/content/site";
import { ParallaxImage } from "./ParallaxImage";
import { MaskLine, Reveal } from "./Reveal";
import { ArrowRightIcon } from "./icons";

/**
 * Clases, en fondo pizarra: titular grande y los tres pasos para reservar; las
 * modalidades en dos columnas (foto al lado del texto, con mucho aire entre
 * ellas) y una franja final a sangre con la foto y el botón a la agenda.
 */
export function Classes() {
  const [lineA, lineB] = classesIntro.titleLines;

  return (
    <section
      id="clases"
      aria-labelledby="clases-titulo"
      className="scroll-mt-[72px] bg-pizarra text-nieve"
    >
      <div className="shell pb-20 pt-24 sm:pb-24 sm:pt-28 lg:pb-28 lg:pt-[120px]">
        {/* Cabecera */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow text-glaciar">{classesIntro.eyebrow}</p>
            </Reveal>
            <h2
              id="clases-titulo"
              className="mt-6 font-serif text-[clamp(2.75rem,7vw,6.5rem)] font-light leading-[0.95] tracking-[-0.03em]"
            >
              <MaskLine>{lineA}</MaskLine>
              <MaskLine delay={0.1}>
                <em className="italic">{lineB}</em>
              </MaskLine>
            </h2>
          </div>

          <div>
            <Reveal delay={0.15}>
              <p className="max-w-[52ch] text-lead text-crema">
                {classesIntro.text}
              </p>
            </Reveal>
            <ol className="mt-9 grid gap-1 border-t border-crema/30 sm:grid-cols-3 sm:gap-0">
              {howItWorks.map((step, i) => (
                <Reveal
                  key={step.title}
                  as="li"
                  delay={0.25 + i * 0.1}
                  y={12}
                  className={`pt-6 sm:pr-6 ${i > 0 ? "sm:border-l sm:border-crema/30 sm:pl-6" : ""}`}
                >
                  <span className="font-serif text-[1.75rem] italic text-glaciar">
                    {i + 1}
                  </span>
                  <p className="mt-2 font-semibold">{step.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-glaciar">
                    {step.text}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        {/* Modalidades: 2 columnas, foto al lado del texto */}
        <ul className="mt-20 grid gap-14 lg:mt-24 lg:grid-cols-2 lg:gap-x-14">
          {classModes.map((mode, i) => (
            <Reveal key={mode.id} as="li" delay={(i % 2) * 0.1} y={24}>
              <article className="group grid gap-6 border-b border-crema/20 pb-14 sm:grid-cols-[minmax(0,240px)_1fr] sm:gap-9 xl:grid-cols-[260px_1fr]">
                <div className="relative isolate aspect-[4/3] overflow-hidden rounded-media bg-lino/20 sm:aspect-[3/4]">
                  <img
                    src={mode.image}
                    alt={mode.imageAlt}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="eyebrow text-glaciar">
                    {mode.discipline} · {mode.level}
                  </span>
                  <h3 className="mt-3 font-serif text-[clamp(2rem,2.8vw,2.5rem)] font-normal leading-[1.05]">
                    {mode.title}
                  </h3>
                  <p className="mt-3.5 leading-relaxed text-crema">
                    {mode.text}
                  </p>
                  <div className="mt-8 flex items-center justify-between gap-4 text-sm sm:mt-auto sm:pt-8">
                    <span className="whitespace-nowrap text-glaciar">Hasta 3 personas</span>
                    <a
                      href={site.bookingUrl}
                      aria-label={`Reservar clase de ${mode.discipline.toLowerCase()}: ${mode.title}`}
                      className="btn btn-light"
                    >
                      Reservar
                      <ArrowRightIcon
                        width={15}
                        height={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* Reserva: franja ancha con la foto, dentro del ancho del contenido */}
      <div className="shell pb-24 sm:pb-28 lg:pb-[120px]">
        <ParallaxImage
          src={classesCta.image}
          alt="Esquiador trazando una curva bajo el cielo azul"
          strength={8}
          className="h-[560px] sm:h-[480px] lg:h-[520px]"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(0deg,rgba(36,72,97,0.92)_0%,rgba(36,72,97,0.55)_55%,rgba(36,72,97,0.1)_100%)] sm:bg-[linear-gradient(90deg,rgba(36,72,97,0.92)_0%,rgba(36,72,97,0.6)_45%,rgba(36,72,97,0)_78%)]"
          />
          <div className="absolute inset-0 flex flex-col justify-end gap-6 px-6 pb-10 sm:justify-center sm:px-12 sm:pb-0 lg:px-16">
            <span className="eyebrow">Hasta 3 personas por clase</span>
            <p className="max-w-[13ch] font-serif text-[clamp(2.5rem,5.5vw,4.75rem)] font-light leading-[0.98] tracking-[-0.02em]">
              {classesCta.title}
            </p>
            <p className="max-w-[40ch] text-lead text-nieve">
              {classesCta.text}
            </p>
            <div>
              <a
                href={site.bookingUrl}
                className="group btn btn-light px-7 py-4"
              >
                Ver horarios y reservar
                <ArrowRightIcon
                  width={16}
                  height={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </ParallaxImage>
      </div>
    </section>
  );
}
