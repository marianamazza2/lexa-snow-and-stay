// Apartamentos de Lexa Snow & Stay.
//
// PROVISIONAL: nombres, textos, capacidades y fotos son de ejemplo para el diseño.
// Las fotos son de Unsplash (licencia libre) y se sustituirán por las reales.
//
// Para añadir un alojamiento nuevo basta con sumar un objeto a la lista.
// Con `published: false` queda preparado pero no se muestra en la web.

export type Apartment = {
  slug: string
  name: string
  tagline: string
  summary: string
  guests: number
  bedrooms: number
  bathrooms: number
  highlights: string[]
  images: { src: string; alt: string }[]
  airbnbUrl: string
  bookingUrl: string
  published: boolean
}

const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const apartments: Apartment[] = [
  {
    slug: 'veleta',
    name: 'Veleta',
    tagline: 'Luz y vistas a las cumbres',
    summary:
      'Salón abierto con grandes ventanales y madera clara. Ideal para una pareja o una familia pequeña que quiere despertar mirando la montaña.',
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    highlights: ['Vistas a la sierra', 'Cocina equipada', 'Wifi'],
    images: [
      { src: unsplash('1613914049786-b7e3e8323348'), alt: 'Salón de madera clara con ventanales y vistas a la montaña' },
      { src: unsplash('1645640929991-867520dce42a'), alt: 'Dormitorio con paredes de madera y ropa de cama cálida' },
    ],
    airbnbUrl: '#', // TODO
    bookingUrl: '#', // TODO
    published: true,
  },
  {
    slug: 'mulhacen',
    name: 'Mulhacén',
    tagline: 'El más amplio, para grupos',
    summary:
      'Espacioso y acogedor, con vigas de madera y una mesa grande para cenar todos juntos después de un día en pistas.',
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    highlights: ['Comedor amplio', 'Guardaesquís', 'Calefacción central'],
    images: [
      { src: unsplash('1738315452605-f3ff2d162631'), alt: 'Salón acogedor con vigas de madera y luz natural' },
      { src: unsplash('1761470427837-742a93e1a3bb'), alt: 'Comedor de madera con bancos y lámpara cálida' },
    ],
    airbnbUrl: '#', // TODO
    bookingUrl: '#', // TODO
    published: true,
  },
  {
    slug: 'borreguiles',
    name: 'Borreguiles',
    tagline: 'Cálido y a un paso de todo',
    summary:
      'Un refugio cómodo y luminoso, pensado para descansar bien y salir a la nieve en pocos minutos.',
    guests: 4,
    bedrooms: 1,
    bathrooms: 1,
    highlights: ['Cerca de los remontes', 'Sofá cama', 'Wifi'],
    images: [
      { src: unsplash('1585803114088-cd027272106a'), alt: 'Salón con grandes ventanales y paisaje nevado' },
      { src: unsplash('1767348922879-a5cade5cceff'), alt: 'Salón cálido con tapiz de montaña y ventanas amplias' },
    ],
    airbnbUrl: '#', // TODO
    bookingUrl: '#', // TODO
    published: true,
  },
  {
    slug: 'alcazaba',
    name: 'Alcazaba',
    tagline: 'Íntimo, para dos',
    summary:
      'Pequeño, cuidado al detalle y muy tranquilo. Perfecto para una escapada en pareja con la nieve como telón de fondo.',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    highlights: ['Ideal parejas', 'Terraza', 'Cocina equipada'],
    images: [
      { src: unsplash('1721396187252-3450d33e9b6a'), alt: 'Salón con lámpara de araña y vistas a la sierra' },
      { src: unsplash('1736796310381-d5c82ce99826'), alt: 'Sofá y mesa baja en un salón luminoso' },
    ],
    airbnbUrl: '#', // TODO
    bookingUrl: '#', // TODO
    published: true,
  },
]

export const publishedApartments = apartments.filter((a) => a.published)

export const getApartment = (slug: string) => publishedApartments.find((a) => a.slug === slug)
