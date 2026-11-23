import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { site } from '@/content/site'
import { cn } from '@/lib/cn'
import { MaskLine, Reveal, ease } from './Reveal'
import { ArrowRightIcon, InstagramIcon } from './icons'

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
    <section id="contacto" aria-labelledby="contacto-titulo" className="scroll-mt-[72px] bg-pizarra text-nieve">
      <div className="shell grid gap-14 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:py-32">
        {/* Columna izquierda */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-glaciar">Contacto</p>
          </Reveal>
          <h2 id="contacto-titulo" className="mt-5 font-serif text-title">
            <MaskLine>Hablemos de</MaskLine>
            <MaskLine delay={0.08}>tu escapada</MaskLine>
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-[42ch] text-lead text-nieve/75">
              ¿Dudas sobre disponibilidad, niveles o algo concreto que necesites? Escríbenos y te respondemos
              personalmente.
            </p>
          </Reveal>

          <Reveal delay={0.25} className="mt-10 grid gap-3">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-nieve/15 px-5 py-4 transition-colors duration-300 hover:border-nieve/40 hover:bg-nieve/5"
            >
              <span className="flex items-center gap-4">
                <span className="grid size-11 place-items-center rounded-full bg-nieve/10">
                  <InstagramIcon />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.2em] text-nieve/60">Instagram</span>
                  <span>{site.instagramHandle}</span>
                </span>
              </span>
              <ArrowRightIcon width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <div className="flex items-center gap-4 rounded-2xl border border-nieve/15 px-5 py-4">
              <span className="grid size-11 place-items-center rounded-full bg-nieve/10">
                <MailIcon />
              </span>
              <span className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.2em] text-nieve/60">Email</span>
                <span className="select-all">{site.email}</span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-8 text-sm text-nieve/55">{site.location}</p>
          </Reveal>
        </div>

        {/* Formulario */}
        <Reveal delay={0.15} y={30} className="lg:col-span-7">
          <div className="relative rounded-[24px] bg-nieve p-6 text-pizarra shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)] sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="flex min-h-[420px] flex-col items-start justify-center gap-4"
                  role="status"
                >
                  <span className="grid size-14 place-items-center rounded-full bg-glaciar/50 text-lago">
                    <CheckIcon />
                  </span>
                  <p className="font-serif text-card">Mensaje enviado</p>
                  <p className="max-w-[40ch] text-piedra">
                    Gracias por escribirnos. Te responderemos en tu email lo antes posible.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-2 text-sm font-medium text-lago underline-offset-4 hover:underline"
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
                  className="grid gap-6"
                >
                  {/* Motivo */}
                  <fieldset>
                    <legend className="mb-3 text-sm font-medium">¿Sobre qué quieres consultar?</legend>
                    <div className="flex flex-wrap gap-2">
                      {TOPICS.map((t) => (
                        <label
                          key={t}
                          className={cn(
                            'cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-300',
                            topic === t
                              ? 'border-accion bg-accion text-nieve'
                              : 'border-pizarra/20 text-pizarra hover:border-pizarra/50',
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

                  <div className="grid gap-6 sm:grid-cols-2">
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
                    <p role="alert" className="rounded-xl bg-alerta/10 px-4 py-3 text-sm text-alerta">
                      No se pudo enviar el mensaje. Inténtalo de nuevo o escríbenos por Instagram.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-accion px-7 py-4 text-sm font-medium text-nieve transition-opacity disabled:opacity-70 sm:w-fit"
                  >
                    <span className="absolute inset-0 translate-y-full rounded-full bg-pizarra transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                    <span className="relative">{status === 'sending' ? 'Enviando…' : 'Enviar consulta'}</span>
                    <ArrowRightIcon width={16} height={16} className="relative transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
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
  const base =
    'w-full rounded-xl border bg-crema/40 px-4 py-3 text-pizarra placeholder:text-piedra/60 transition-colors duration-300 focus:border-lago focus:bg-nieve focus:outline-none'
  const tone = error ? 'border-alerta' : 'border-escarcha'
  const describedBy = error ? `${id}-error` : undefined

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={5}
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

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
)

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)
