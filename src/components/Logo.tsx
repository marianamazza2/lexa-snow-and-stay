import { cn } from '@/lib/cn'

// Logotipo provisional en texto. Se sustituye por el SVG oficial cuando lo tengamos.
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('flex flex-col items-center leading-none', className)}>
      <span className="font-serif text-[1.6rem] tracking-[0.22em] pl-[0.22em]">LEXA</span>
      <span className="mt-1 flex items-center gap-1.5 text-[0.5rem] font-medium tracking-[0.32em] uppercase">
        <span aria-hidden className="h-px w-3 bg-current opacity-70" />
        Snow and Stay
        <span aria-hidden className="h-px w-3 bg-current opacity-70" />
      </span>
    </span>
  )
}
