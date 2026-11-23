import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/cn'
import { ease } from './Reveal'
import { ArrowRightIcon, CloseIcon, GridIcon } from './icons'

type Img = { src: string; alt: string }

/**
 * Galería de la ficha.
 * - Escritorio: mosaico (una foto grande y cuatro pequeñas).
 * - Móvil: carrusel deslizable con contador.
 * Cualquier foto abre el visor a pantalla completa.
 */
export function Gallery({ images, name }: { images: Img[]; name: string }) {
  const [open, setOpen] = useState<number | null>(null)
  const mosaic = images.slice(0, 5)

  return (
    <>
      {/* Escritorio */}
      <div className="relative hidden h-[min(68svh,640px)] min-h-[420px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl sm:grid">
        {mosaic.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Ampliar foto ${i + 1} de ${images.length}: ${img.alt}`}
            className={cn(
              'group relative overflow-hidden bg-lino',
              i === 0 && 'col-span-2 row-span-2',
              mosaic.length < 5 && i === mosaic.length - 1 && 'col-span-2',
            )}
          >
            <img
              src={img.src}
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              className="absolute inset-0 size-full object-cover transition-[filter] duration-500 group-hover:brightness-90"
            />
          </button>
        ))}
        <button type="button" onClick={() => setOpen(0)} className="btn btn-light absolute bottom-5 right-5 shadow-sm">
          <GridIcon width={16} height={16} />
          Ver las {images.length} fotos
        </button>
      </div>

      {/* Móvil */}
      <MobileSlider images={images} onOpen={setOpen} />

      <Lightbox images={images} name={name} index={open} onChange={setOpen} />
    </>
  )
}

function MobileSlider({ images, onOpen }: { images: Img[]; onOpen: (i: number) => void }) {
  const [current, setCurrent] = useState(0)

  return (
    <div className="relative -mx-[var(--shell-gutter)] sm:hidden">
      <ul
        onScroll={(e) => {
          const el = e.currentTarget
          setCurrent(Math.round(el.scrollLeft / el.clientWidth))
        }}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
      >
        {images.map((img, i) => (
          <li key={img.src} className="w-full shrink-0 snap-center">
            <button type="button" onClick={() => onOpen(i)} className="block aspect-[4/3] w-full bg-lino">
              <img src={img.src} alt={img.alt} loading={i === 0 ? 'eager' : 'lazy'} className="size-full object-cover" />
            </button>
          </li>
        ))}
      </ul>
      <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-pizarra/70 px-3 py-1 text-xs font-medium text-nieve backdrop-blur-sm">
        {current + 1} / {images.length}
      </span>
    </div>
  )
}

function Lightbox({
  images,
  name,
  index,
  onChange,
}: {
  images: Img[]
  name: string
  index: number | null
  onChange: (i: number | null) => void
}) {
  const isOpen = index !== null
  const closeRef = useRef<HTMLButtonElement>(null)
  const [dir, setDir] = useState(0)

  const go = useCallback(
    (d: number) => {
      if (index === null) return
      setDir(d)
      onChange((index + d + images.length) % images.length)
    },
    [index, images.length, onChange],
  )

  // Teclado, bloqueo del scroll de la página y foco
  useEffect(() => {
    if (!isOpen) return
    const opener = document.activeElement as HTMLElement | null
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      html.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      opener?.focus()
    }
  }, [isOpen, go, onChange])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Fotos del apartamento ${name}`}
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#1f2328]/95 text-nieve backdrop-blur-sm"
        >
          <div className="shell flex h-[72px] shrink-0 items-center justify-between">
            <span className="text-sm tabular-nums text-nieve/80">
              {index + 1} / {images.length}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => onChange(null)}
              aria-label="Cerrar"
              className="grid size-11 place-items-center rounded-full transition-colors hover:bg-nieve/10"
            >
              <CloseIcon width={22} height={22} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-24">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.img
                key={index}
                src={images[index].src}
                alt={images[index].alt}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.45, ease }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1)
                  else if (info.offset.x > 60) go(-1)
                }}
                className="max-h-full max-w-full cursor-grab select-none rounded-lg object-contain active:cursor-grabbing"
                draggable={false}
              />
            </AnimatePresence>

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto anterior"
              className="absolute left-6 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-nieve/40 transition-colors hover:bg-nieve/10 sm:grid"
            >
              <ArrowRightIcon className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Foto siguiente"
              className="absolute right-6 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-nieve/40 transition-colors hover:bg-nieve/10 sm:grid"
            >
              <ArrowRightIcon />
            </button>
          </div>

          {/* Miniaturas */}
          <div className="shell shrink-0 py-5">
            <ul className="no-scrollbar mx-auto flex w-fit max-w-full gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <li key={img.src} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setDir(i > index ? 1 : -1)
                      onChange(i)
                    }}
                    aria-label={`Ver foto ${i + 1}`}
                    aria-current={i === index}
                    className={cn(
                      'block h-14 w-20 overflow-hidden rounded-md transition-opacity sm:h-16 sm:w-24',
                      i === index ? 'opacity-100 ring-2 ring-nieve' : 'opacity-45 hover:opacity-80',
                    )}
                  >
                    <img src={img.src} alt="" className="size-full object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
