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
  /** Texto largo de la ficha, un párrafo por elemento */
  description: string[]
  /** Equipamiento: aparece en la lista «Lo que encontrarás» */
  amenities: string[]
  /** Dónde se duerme: una línea por estancia */
  beds: { room: string; detail: string }[]
  images: { src: string; alt: string }[]
  /** Enlace del botón «Reservar» de la ficha (Airbnb, Booking o el que corresponda) */
  reservaUrl: string
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
    description: [
      'Veleta es el apartamento de la luz. El salón se abre a la sierra con grandes ventanales y la madera clara hace que, incluso en los días grises, la casa se sienta cálida.',
      'Tiene dos dormitorios independientes, cocina completa para no depender de restaurantes y un rincón junto a la ventana que es el mejor sitio para el café de la mañana.',
    ],
    amenities: ['Vistas a la sierra', 'Cocina equipada', 'Wifi', 'Calefacción', 'Guardaesquís', 'Ropa de cama y toallas', 'Smart TV', 'Cafetera'],
    beds: [
      { room: 'Dormitorio 1', detail: '1 cama doble' },
      { room: 'Dormitorio 2', detail: '2 camas individuales' },
    ],
    images: [
      { src: unsplash('1613914049786-b7e3e8323348'), alt: 'Salón de madera clara con ventanales y vistas a la montaña' },
      { src: unsplash('1645640929991-867520dce42a'), alt: 'Dormitorio con paredes de madera y ropa de cama cálida' },
      { src: unsplash('1738315452605-f3ff2d162631'), alt: 'Salón acogedor con vigas de madera y luz natural' },
      { src: unsplash('1767348922879-a5cade5cceff'), alt: 'Salón cálido con tapiz de montaña y ventanas amplias' },
      { src: unsplash('1736796310381-d5c82ce99826'), alt: 'Sofá y mesa baja en un salón luminoso' },
    ],
    reservaUrl: '#', // TODO: enlace de reserva
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
    description: [
      'Mulhacén es el más amplio de los cuatro, pensado para grupos y familias que quieren estar juntos sin estar encima unos de otros.',
      'Las vigas de madera y la mesa de comedor grande marcan el ambiente: después de un día en pistas, aquí se cena con calma. Tres dormitorios y dos baños hacen que las mañanas sean fáciles.',
    ],
    amenities: ['Comedor para 6', 'Cocina equipada', 'Wifi', 'Calefacción central', 'Guardaesquís', 'Ropa de cama y toallas', 'Lavadora', 'Smart TV'],
    beds: [
      { room: 'Dormitorio 1', detail: '1 cama doble' },
      { room: 'Dormitorio 2', detail: '1 cama doble' },
      { room: 'Dormitorio 3', detail: '2 camas individuales' },
    ],
    images: [
      { src: unsplash('1738315452605-f3ff2d162631'), alt: 'Salón acogedor con vigas de madera y luz natural' },
      { src: unsplash('1761470427837-742a93e1a3bb'), alt: 'Comedor de madera con bancos y lámpara cálida' },
      { src: unsplash('1645640929991-867520dce42a'), alt: 'Dormitorio con paredes de madera y ropa de cama cálida' },
      { src: unsplash('1585803114088-cd027272106a'), alt: 'Salón con grandes ventanales y paisaje nevado' },
      { src: unsplash('1721396187252-3450d33e9b6a'), alt: 'Salón con lámpara de araña y vistas a la sierra' },
    ],
    reservaUrl: '#', // TODO: enlace de reserva
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
    description: [
      'Borreguiles es un refugio cómodo y luminoso, a pocos minutos a pie de los remontes. Ideal si lo que quieres es aprovechar al máximo los días de nieve.',
      'Un dormitorio, un salón con sofá cama para dos personas más y todo lo necesario para cocinar y descansar bien.',
    ],
    amenities: ['Cerca de los remontes', 'Sofá cama', 'Cocina equipada', 'Wifi', 'Calefacción', 'Guardaesquís', 'Ropa de cama y toallas'],
    beds: [
      { room: 'Dormitorio', detail: '1 cama doble' },
      { room: 'Salón', detail: '1 sofá cama doble' },
    ],
    images: [
      { src: unsplash('1585803114088-cd027272106a'), alt: 'Salón con grandes ventanales y paisaje nevado' },
      { src: unsplash('1767348922879-a5cade5cceff'), alt: 'Salón cálido con tapiz de montaña y ventanas amplias' },
      { src: unsplash('1645640929991-867520dce42a'), alt: 'Dormitorio con paredes de madera y ropa de cama cálida' },
      { src: unsplash('1761470427837-742a93e1a3bb'), alt: 'Comedor de madera con bancos y lámpara cálida' },
      { src: unsplash('1613914049786-b7e3e8323348'), alt: 'Salón de madera clara con ventanales y vistas a la montaña' },
    ],
    reservaUrl: '#', // TODO: enlace de reserva
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
    description: [
      'Alcazaba es pequeño, cuidado al detalle y muy tranquilo. Pensado para dos, para una escapada en pareja con la nieve como telón de fondo.',
      'Tiene una terraza para mirar la sierra al atardecer y una cocina equipada para quedarse en casa cuando apetece.',
    ],
    amenities: ['Ideal parejas', 'Terraza', 'Cocina equipada', 'Wifi', 'Calefacción', 'Ropa de cama y toallas', 'Cafetera'],
    beds: [
      { room: 'Dormitorio', detail: '1 cama doble' },
    ],
    images: [
      { src: unsplash('1721396187252-3450d33e9b6a'), alt: 'Salón con lámpara de araña y vistas a la sierra' },
      { src: unsplash('1736796310381-d5c82ce99826'), alt: 'Sofá y mesa baja en un salón luminoso' },
      { src: unsplash('1645640929991-867520dce42a'), alt: 'Dormitorio con paredes de madera y ropa de cama cálida' },
      { src: unsplash('1585803114088-cd027272106a'), alt: 'Salón con grandes ventanales y paisaje nevado' },
      { src: unsplash('1738315452605-f3ff2d162631'), alt: 'Salón acogedor con vigas de madera y luz natural' },
    ],
    reservaUrl: '#', // TODO: enlace de reserva
    published: true,
  },
]

// Información práctica común a todos los apartamentos. PROVISIONAL: confirmar con la clienta.
export const stayInfo = [
  { label: 'Entrada', value: 'A partir de las 16:00' },
  { label: 'Salida', value: 'Hasta las 11:00' },
  { label: 'Ubicación', value: 'Pradollano, Sierra Nevada' },
  { label: 'Normas', value: 'No se permite fumar ni hacer fiestas' },
]

export const publishedApartments = apartments.filter((a) => a.published)

export const getApartment = (slug: string) => publishedApartments.find((a) => a.slug === slug)
