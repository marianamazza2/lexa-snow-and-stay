import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'

// Logotipo oficial (public/logo-lexa.webp, fondo transparente).
// Se pinta con una máscara CSS, así toma el color del texto (currentColor):
// blanco sobre el hero y el footer, pizarra sobre la barra clara.
const mask: CSSProperties = {
  WebkitMaskImage: 'url(/logo-lexa.webp)',
  maskImage: 'url(/logo-lexa.webp)',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
}

export function Logo({ className }: { className?: string }) {
  return <span aria-hidden className={cn('block aspect-[800/484] h-14 bg-current', className)} style={mask} />
}
