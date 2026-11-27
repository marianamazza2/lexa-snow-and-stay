import {
  classModes,
  classesCta,
  classesIntro,
  howItWorks,
} from "@/content/classes";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { MobileSlider } from "./MobileSlider";
import { ParallaxImage } from "./ParallaxImage";
import { MaskLine, Reveal } from "./Reveal";
import { ArrowRightIcon } from "./icons";

/**
 * Clases, en fondo pizarra: titular grande y los tres pasos para reservar (en
 * móvil, en pestañas que avanzan solas); las modalidades en tarjetas (en móvil,
 * un slider) y una franja final con la foto y el botón a la agenda.
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
            <StepsMobile />
            <ol className="mt-9 hidden border-t border-crema/30 sm:grid sm:grid-cols-3">
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

        {/* Modalidades: tarjetas. En móvil, slider */}
        <MobileSlider
          label="Modalidades de clase"
          tone="light"
          className="mt-16 lg:mt-24"
          gridClassName="sm:grid sm:grid-cols-2 sm:gap-6"
        >
          {classModes.map((mode) => (
            <li key={mode.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-nieve/[0.06] ring-1 ring-inset ring-crema/15">
                <div className="relative isolate aspect-[16/10] overflow-hidden bg-lino/20">
                  <img
                    src={mode.image}
                    alt={mode.imageAlt}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-7">
                  <p className="text-sm font-semibold text-glaciar">
                    {mode.discipline} · {mode.level}
                  </p>
                  <h3 className="mt-1.5 font-serif text-[clamp(1.6rem,2.4vw,2.1rem)] font-normal leading-[1.1]">
                    {mode.title}
                  </h3>
                  <p className="mb-6 mt-2.5 leading-relaxed text-crema">{mode.text}</p>
                  <a
                    href={site.bookingUrl}
                    aria-label={`Reservar clase de ${mode.discipline.toLowerCase()}: ${mode.title}`}
                    className="btn btn-light mt-auto self-start"
                  >
                    Reservar
                    <ArrowRightIcon
                      width={15}
                      height={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </MobileSlider>
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

/**
 * Móvil: los tres pasos en pestañas. Avanzan solos cada pocos segundos (con una
 * barra que marca el tiempo) hasta que tocas una; entonces se quedan quietos.
 */
function StepsMobile() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const step = howItWorks[active];

  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % howItWorks.length), 4500);
    return () => clearTimeout(t);
  }, [active, auto]);

  return (
    <Reveal delay={0.25} y={12} className="mt-8 sm:hidden">
      <div role="tablist" aria-label="Cómo reservar" className="grid grid-cols-3 gap-2">
        {howItWorks.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            id={`paso-${i}`}
            aria-selected={i === active}
            aria-controls="paso-panel"
            onClick={() => {
              setActive(i);
              setAuto(false);
            }}
            className={cn(
              "relative flex flex-col items-start gap-1 overflow-hidden rounded-xl px-3 pb-3 pt-2.5 text-left transition-colors duration-300",
              i === active ? "bg-nieve text-pizarra" : "bg-nieve/[0.07] text-crema",
            )}
          >
            <span className={cn("font-serif text-xl italic", i === active ? "text-lago" : "text-glaciar")}>
              {i + 1}
            </span>
            <span className="text-[0.8rem] font-semibold leading-tight">{s.title}</span>
            {i === active && auto && (
              <span
                key={active}
                aria-hidden
                className="step-progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-lago"
              />
            )}
          </button>
        ))}
      </div>
      <p
        id="paso-panel"
        role="tabpanel"
        aria-labelledby={`paso-${active}`}
        aria-live="polite"
        className="mt-4 min-h-[3.2em] text-sm leading-relaxed text-glaciar"
      >
        {step.text}
      </p>
    </Reveal>
  );
}
