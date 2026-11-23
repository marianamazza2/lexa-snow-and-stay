import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { site } from '@/content/site'
import { cn } from '@/lib/cn'
import { MaskLine, Reveal, ease } from './Reveal'
import { ArrowRightIcon } from './icons'

const TOPICS = ['Alojamiento', 'Clases', 'Otra consulta'] as const
type Topic = (typeof TOPICS)[number]

type Errors = Partial<Record<'name' | 'email' | 'message' | 'privacy', string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Contacto: a la izquierda, título y vías directas (Instagram y email);
 * a la derecha, formulario de consulta que llega al email de la clienta.
 */
export function Contact() {
  const [topic, setTopic] = useState<Topic>('Alojamiento')
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const values = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      dates: String(data.get('dates') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
      privacy: data.get('privacy') === 'on',
    }

    const next: Errors = {}
    if (!values.name) next.name = 'Escribe tu nombre.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Revisa el email: parece incompleto.'
    if (values.message.length < 10) next.message = 'Cuéntanos un poco más (al menos 10 caracteres).'
    if (!values.privacy) next.privacy = 'Necesitamos tu consentimiento para responderte.'
    setErrors(next)
    if (Object.keys(next).length) return

    setStatus('sending')
    try {
      if (site.formEndpoint) {
        const res = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...values, topic, _subject: `Consulta web · ${topic}` }),
        })
        if (!res.ok) throw new Error(String(res.status))
      } else {
        // Modo demostración: todavía no hay servicio de envío configurado
        await new Promise((r) => setTimeout(r, 900))
      }
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="scroll-mt-[72px] bg-crema text-pizarra">
      <div className="shell grid gap-16 py-24 sm:py-28 lg:grid-cols-12 lg:gap-20 lg:py-[120px]">
        {/* Columna izquierda */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-piedra">Contacto</p>
          </Reveal>
          <h2
            id="contacto-titulo"
            className="mt-6 font-serif text-[clamp(2.75rem,6vw,5.5rem)] font-light leading-[0.95] tracking-[-0.03em]"
          >
            <MaskLine>Hablemos de</MaskLine>
            <MaskLine delay={0.08}>
              <em className="italic text-lago">tu escapada.</em>
            </MaskLine>
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-7 max-w-[40ch] text-lead text-piedra">
              ¿Dudas sobre disponibilidad, niveles o algo concreto? Escríbenos y te respondemos personalmente.
            </p>
          </Reveal>

          {/* Vías directas */}
          <Reveal delay={0.25} className="mt-12 border-t border-pizarra">
            <ContactRow label="Instagram" value={site.instagramHandle} href={site.instagramUrl} external />
            <ContactRow label="Email" value={site.email} href={`mailto:${site.email}`} />
            <ContactRow label="Dónde" value={site.location} />
          </Reveal>
        </div>

        {/* Formulario: abierto sobre el fondo, sin tarjeta */}
        <Reveal delay={0.15} y={30} className="lg:col-span-7 lg:pt-3">
          <AnimatePresence mode="wait" initial={false}>
            {status === 'sent' ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
                className="flex min-h-[420px] flex-col items-start justify-center gap-4 border-t border-pizarra pt-10"
                role="status"
              >
                <span className="grid size-14 place-items-center rounded-full bg-glaciar/60 text-lago">
                  <CheckIcon />
                </span>
                <p className="font-serif text-[2.25rem] font-light leading-tight">Mensaje enviado</p>
                <p className="max-w-[40ch] text-piedra">
                  Gracias por escribirnos. Te responderemos en tu email lo antes posible.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-sm font-semibold text-lago underline-offset-4 hover:underline"
                >
                  Enviar otra consulta
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-9"
              >
                {/* Motivo */}
                <fieldset>
                  <legend className="eyebrow mb-4 text-piedra">¿Sobre qué quieres consultar?</legend>
                  <div className="flex flex-wrap gap-2">
                    {TOPICS.map((t) => (
                      <label
                        key={t}
                        className={cn(
                          'cursor-pointer rounded-control border px-5 py-3 text-sm font-medium transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-lago',
                          topic === t
                            ? 'border-pizarra bg-pizarra text-nieve'
                            : 'border-pizarra/30 text-pizarra hover:border-pizarra',
                        )}
                      >
                        <input
                          type="radio"
                          name="topic"
                          value={t}
                          checked={topic === t}
                          onChange={() => setTopic(t)}
                          className="sr-only"
                        />
                        {t}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-9 sm:grid-cols-2 sm:gap-x-8">
                  <Field id="name" label="Nombre" error={errors.name} autoComplete="name" />
                  <Field id="email" label="Email" type="email" error={errors.email} autoComplete="email" />
                  <Field id="phone" label="Teléfono (opcional)" type="tel" autoComplete="tel" />
                  <Field
                    id="dates"
                    label={topic === 'Clases' ? 'Fechas y nivel (opcional)' : 'Fechas y personas (opcional)'}
                    placeholder={topic === 'Clases' ? 'Ej. 12 de enero, iniciación' : 'Ej. 12–15 enero, 4 personas'}
                  />
                </div>

                <Field id="message" label="Mensaje" textarea error={errors.message} />

                <div>
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-piedra">
                    <input
                      id="privacy"
                      name="privacy"
                      type="checkbox"
                      aria-invalid={!!errors.privacy}
                      aria-describedby={errors.privacy ? 'privacy-error' : undefined}
                      className="mt-0.5 size-4 shrink-0 accent-[#2f5b78]"
                    />
                    <span>
                      He leído y acepto la{' '}
                      <a href="/privacidad" className="text-lago underline underline-offset-2">
                        política de privacidad
                      </a>
                      .
                    </span>
                  </label>
                  {errors.privacy && (
                    <p id="privacy-error" className="mt-2 text-sm text-alerta">
                      {errors.privacy}
                    </p>
                  )}
                </div>

                {status === 'error' && (
                  <p role="alert" className="rounded-control bg-alerta/10 px-4 py-3 text-sm text-alerta">
                    No se pudo enviar el mensaje. Inténtalo de nuevo o escríbenos por Instagram.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-control bg-accion px-8 py-4 text-sm font-semibold text-nieve transition-colors duration-300 hover:bg-accion-hover disabled:opacity-70 sm:w-fit"
                >
                  {status === 'sending' ? 'Enviando…' : 'Enviar consulta'}
                  <ArrowRightIcon width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}

/** Fila de contacto directo: etiqueta pequeña, dato grande y flecha si es enlace. */
function ContactRow({ label, value, href, external }: { label: string; value: string; href?: string; external?: boolean }) {
  const content = (
    <>
      <span className="flex flex-col gap-1.5">
        <span className="eyebrow text-piedra">{label}</span>
        <span className="break-all font-serif text-[clamp(1.4rem,2.2vw,1.75rem)] leading-tight">{value}</span>
      </span>
      {href && (
        <ArrowRightIcon width={18} height={18} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  )
  const cls = 'group flex items-center justify-between gap-4 border-b border-escarcha py-5'
  return href ? (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={cn(cls, 'transition-colors duration-300 hover:text-lago')}
    >
      {content}
    </a>
  ) : (
    <div className={cls}>{content}</div>
  )
}

function Field({
  id,
  label,
  type = 'text',
  textarea,
  error,
  placeholder,
  autoComplete,
}: {
  id: string
  label: string
  type?: string
  textarea?: boolean
  error?: string
  placeholder?: string
  autoComplete?: string
}) {
  // Campos de línea: solo el borde inferior, sobre el fondo crema
  const base =
    'w-full border-0 border-b bg-transparent px-0 py-3 text-lg text-pizarra placeholder:text-piedra/70 transition-colors duration-300 focus:border-lago focus:shadow-[0_1px_0_0_var(--color-lago)] focus:outline-none'
  const tone = error ? 'border-alerta' : 'border-pizarra/40'
  const describedBy = error ? `${id}-error` : undefined

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="eyebrow text-piedra">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={4}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(base, tone, 'resize-none')}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(base, tone)}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-alerta">
          {error}
        </p>
      )}
    </div>
  )
}

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)
