// Apartamentos de Lexa Snow & Stay.
//
// Textos y datos sacados de los dossieres de cada apartamento (noviembre 2026).
// Fotos reales en public/images/<apartamento>, siempre en formato WebP.
//
// Para añadir un alojamiento nuevo basta con sumar un objeto a la lista.
// Con `published: false` queda preparado pero no se muestra en la web.

export type Apartment = {
  slug: string
  name: string
  /** Edificio y zona: aparece junto al nombre en la ficha */
  building: string
  tagline: string
  summary: string
  guests: number
  /** Distribución y baños, p. ej. ['1 dormitorio', '1 baño'] */
  layout: [string, string]
  /** Texto largo de la ficha, un párrafo por elemento */
  description: string[]
  /** Equipamiento: aparece en la lista «Lo que encontrarás» */
  amenities: string[]
  /** Dónde se duerme: una línea por estancia */
  beds: { room: string; detail: string }[]
  /** Ubicación, parking, llegada…: aparece en «Bueno saber» */
  info: { label: string; value: string }[]
  /** Dirección para el enlace a Google Maps */
  mapsQuery: string
  images: { src: string; alt: string }[]
  /** Enlace del botón «Reservar» de la ficha (Airbnb, Booking o el que corresponda) */
  reservaUrl: string
  published: boolean
}

export const apartments: Apartment[] = [
  {
    slug: 'arttyfal',
    name: 'Arttyfal',
    building: 'Edificio Arttyfal · Sierra Nevada',
    tagline: 'Estudio con vistas a la montaña',
    summary:
      'Un estudio acogedor para compartir días de nieve y descanso, con parking incluido, entrada autónoma y unas vistas increíbles hacia la montaña y hacia Granada.',
    guests: 4,
    layout: ['Estudio diáfano', '1 baño'],
    description: [
      'Un estudio diáfano para hasta 4 personas, sin dormitorio independiente: una cama de matrimonio y dos camas individuales comparten el mismo espacio abierto, junto a la mesa para comer y los rincones para descansar.',
      'La cocina tiene menaje para preparar tus comidas, el baño dispone de bañera con ducha y hay armario y zona de perchas para la ropa y los abrigos. Desayunos con calma, vistas que enamoran y un sitio cómodo al que volver después de esquiar.',
    ],
    amenities: [
      'Parking incluido',
      'Entrada autónoma',
      'Vistas a la montaña',
      'WiFi',
      'Calefacción',
      'Smart TV',
      'Cocina con menaje',
      'Sábanas y toallas incluidas',
      'Bañera con ducha',
      'Armario y zona de perchas',
    ],
    beds: [
      { room: 'Espacio abierto', detail: '1 cama de matrimonio' },
      { room: 'Espacio abierto', detail: '2 camas individuales' },
    ],
    info: [
      { label: 'Dirección', value: 'Calle de la Virgen de las Nieves, 35 · Edificio Arttyfal' },
      { label: 'Telesilla', value: 'A unos 100 m de la parada intermedia del telesilla Parador I' },
      { label: 'Plaza de Andalucía', value: 'A unos 10 minutos a pie, con pendientes' },
      { label: 'Parking', value: 'Incluido en el precio' },
      { label: 'Llegada', value: 'Entrada autónoma, con instrucciones antes de llegar' },
      { label: 'Alrededores', value: 'Supermercados y restaurantes cerca' },
    ],
    mapsQuery: 'Calle de la Virgen de las Nieves 35, 18196 Sierra Nevada, Granada',
    images: [
      { src: '/images/arttyfal/01-estudio.webp', alt: 'Estudio con paredes de madera, camas y mesa junto a las ventanas' },
      { src: '/images/arttyfal/02-camas.webp', alt: 'Cama individual con cojines y cama de matrimonio bajo las ventanas' },
      { src: '/images/arttyfal/03-salon.webp', alt: 'Salón con mesa baja redonda, televisión y mesa de comedor' },
      { src: '/images/arttyfal/04-dormitorio-salon.webp', alt: 'Cama doble, mesa de comedor y zona de televisión' },
      { src: '/images/arttyfal/05-cocina.webp', alt: 'Cocina blanca con microondas, nevera y vitrocerámica' },
      { src: '/images/arttyfal/06-mesa.webp', alt: 'Mesa de comedor puesta junto a la ventana' },
      { src: '/images/arttyfal/07-bano.webp', alt: 'Baño con bañera, mampara y ventana' },
      { src: '/images/arttyfal/08-lavabo.webp', alt: 'Lavabo con espejo redondo y toallas' },
      { src: '/images/arttyfal/09-vistas.webp', alt: 'Vistas a un mar de nubes sobre el valle desde la terraza' },
      { src: '/images/arttyfal/10-atardecer.webp', alt: 'Atardecer sobre el mar de nubes y los tejados nevados' },
      { src: '/images/arttyfal/11-ventana.webp', alt: 'Ventana de madera con vistas al atardecer y una copa de vino' },
      { src: '/images/arttyfal/12-detalle.webp', alt: 'Estante de madera con cuadro de montaña y decoración' },
      { src: '/images/arttyfal/13-armario.webp', alt: 'Armario blanco con perchas y cómoda' },
      { src: '/images/arttyfal/14-estante.webp', alt: 'Estante con tostadora y tazas sobre la pared de madera' },
    ],
    reservaUrl: '#', // TODO: enlace de reserva
    published: true,
  },
  {
    slug: 'mountain-duplex',
    name: 'Mountain Duplex',
    building: 'Edificio América · Sierra Nevada',
    tagline: 'Un dúplex con encanto, en dos plantas',
    summary:
      'Un dúplex reformado que combina madera, tonos cálidos y espacios de doble altura, en el corazón de Sierra Nevada.',
    guests: 5,
    layout: ['Dos plantas', '1 baño y 1 aseo'],
    description: [
      'Arriba, conectada por la escalera interior, está la zona de descanso: una cama de matrimonio, una cama individual, baño completo y Smart TV.',
      'Abajo, el salón-comedor con cocina integrada, sofá cama doble, televisión de 65 pulgadas y aseo. Todo preparado para desayunar con calma antes de salir a la montaña y relajarte al volver de la nieve.',
    ],
    amenities: [
      'Dos plantas',
      'Smart TV en el dormitorio',
      'Televisión de 65"',
      'Cocina equipada con menaje',
      'Sábanas y toallas incluidas',
      'WiFi',
      'Agua caliente comunitaria',
      'Baño completo y aseo',
    ],
    beds: [
      { room: 'Planta superior', detail: '1 cama de matrimonio y 1 cama individual' },
      { room: 'Planta baja', detail: '1 sofá cama doble' },
    ],
    info: [
      { label: 'Dirección', value: 'Calle de la Virgen de las Nieves · Edificio América' },
      { label: 'Telesilla', value: 'Zona media, cerca de la parada intermedia del telesilla Parador I' },
      { label: 'Parking', value: 'Exterior, por orden de llegada y sin plaza garantizada. Parking privado cercano opcional: 25 € por noche, bajo reserva y según disponibilidad.' },
      { label: 'Alrededores', value: 'Supermercados y restaurantes cerca' },
    ],
    mapsQuery: 'Edificio América, Calle de la Virgen de las Nieves, 18196 Sierra Nevada, Granada',
    images: [
      { src: '/images/mountain-duplex/01-salon-altillo.webp', alt: 'Salón con sofá y cocina, con el dormitorio en el altillo y su escalera' },
      { src: '/images/mountain-duplex/02-salon-cocina.webp', alt: 'Cocina con encimera de madera, sofá y televisión en un salón alargado' },
      { src: '/images/mountain-duplex/03-cocina.webp', alt: 'Cocina blanca con vitrocerámica y cafetera junto al sofá' },
      { src: '/images/mountain-duplex/04-comedor.webp', alt: 'Mesa de comedor con sillas negras y esquís decorativos en la pared' },
      { src: '/images/mountain-duplex/05-escalera.webp', alt: 'Escalera de madera y metal que sube al altillo' },
      { src: '/images/mountain-duplex/06-dormitorio.webp', alt: 'Dormitorio en el altillo con cama doble y cabecero de madera' },
      { src: '/images/mountain-duplex/07-dormitorio-snowboard.webp', alt: 'Cama doble con lámpara de mimbre y una tabla de snowboard en la pared' },
      { src: '/images/mountain-duplex/08-dormitorio-armario.webp', alt: 'Cama doble del altillo con armario de madera al fondo' },
    ],
    reservaUrl: '#', // TODO: enlace de reserva
    published: true,
  },
  {
    slug: 'super-loft',
    name: 'Super Loft',
    building: 'Edificio Europa · Sierra Nevada',
    tagline: 'Un loft amplio y recién reformado',
    summary:
      'Un loft amplio y recién reformado en el corazón de Sierra Nevada, para una escapada en pareja, en familia o con amigos.',
    guests: 4,
    layout: ['Loft diáfano', '1 baño'],
    description: [
      'Un espacio abierto que reúne la zona de descanso, el salón-comedor y la cocina. Tonos suaves, madera y una distribución amplia para compartir tu escapada a la montaña.',
      'La cocina integrada tiene placa, microondas, frigorífico, lavavajillas y lavadora. El baño, reformado en tonos claros con detalles en negro y madera, cuenta con ducha con mampara, doble lavabo y espacio de almacenaje.',
    ],
    amenities: [
      'Cocina integrada',
      'Microondas',
      'Lavavajillas',
      'Lavadora',
      'Frigorífico',
      'Televisión',
      'Ducha con mampara',
      'Doble lavabo',
      'Agua caliente comunitaria',
    ],
    beds: [
      { room: 'Zona de descanso', detail: '1 cama de matrimonio' },
      { room: 'Salón', detail: '1 sofá cama doble' },
    ],
    info: [
      { label: 'Dirección', value: 'Calle de la Virgen de las Nieves, 16 · Edificio Europa' },
      { label: 'Telesilla', value: 'A unos 150 m del telesilla Parador I' },
      { label: 'Parking', value: 'Exterior, por orden de llegada y sin plaza garantizada. Parking privado cercano opcional: 25 € por noche, bajo reserva y según disponibilidad.' },
      { label: 'Alrededores', value: 'Junto a restaurantes y supermercados' },
    ],
    mapsQuery: 'Calle de la Virgen de las Nieves 16, 18196 Sierra Nevada, Granada',
    images: [
      { src: '/images/super-loft/01-salon-cocina.webp', alt: 'Salón diáfano con sofá, mesa de comedor y cocina junto a los ventanales' },
      { src: '/images/super-loft/02-sofa-dormitorio.webp', alt: 'Sofá chaise longue beige con la zona de dormir y la cocina al fondo' },
      { src: '/images/super-loft/03-cocina.webp', alt: 'Cocina en gris y madera con lavadora, lavavajillas y nevera' },
      { src: '/images/super-loft/04-mesa-alta.webp', alt: 'Mesa alta de madera con taburetes junto a la ventana' },
      { src: '/images/super-loft/05-tv.webp', alt: 'Mueble de madera con televisión de pantalla plana' },
      { src: '/images/super-loft/06-lavabo.webp', alt: 'Baño de mármol blanco con lavabo, espejo y estantería' },
      { src: '/images/super-loft/07-ducha.webp', alt: 'Baño con ducha de mampara e inodoro suspendido' },
    ],
    reservaUrl: '#', // TODO: enlace de reserva
    published: true,
  },
  {
    slug: 'arttyco',
    name: 'Arttyco',
    building: 'Edificio Arttyco · Sierra Nevada',
    tagline: 'A dos pasos del telesilla Parador I',
    summary:
      'Tu escapada a la nieve en un apartamento recién reformado, con garaje incluido y zona spa en el edificio.',
    guests: 5,
    layout: ['1 dormitorio', '1 baño'],
    description: [
      'Un apartamento recién reformado con dormitorio independiente y cama de matrimonio. El salón-comedor tiene sofá cama y dos camas individuales en litera, con capacidad para 5 personas.',
      'La cocina dispone de microondas, frigorífico y placa para preparar el desayuno antes de salir a la nieve, y el baño reformado tiene ducha con mampara. Para completar la escapada, el edificio cuenta con zona spa con piscina climatizada, sauna y jacuzzi.',
    ],
    amenities: [
      'Garaje incluido',
      'Cocina equipada',
      'Microondas',
      'Frigorífico',
      'Baño con ducha y mampara',
      'Sábanas y toallas incluidas',
      'Spa en el edificio (opcional)',
    ],
    beds: [
      { room: 'Dormitorio', detail: '1 cama de matrimonio' },
      { room: 'Salón-comedor', detail: '1 sofá cama' },
      { room: 'Salón-comedor', detail: '2 camas individuales en litera' },
    ],
    info: [
      { label: 'Dirección', value: 'Calle de la Virgen de las Nieves, 3 · Edificio Arttyco' },
      { label: 'Telesilla', value: 'A pocos pasos de la parada intermedia del telesilla Parador I' },
      { label: 'Garaje', value: 'Plaza incluida en el precio' },
      { label: 'Spa', value: 'Piscina climatizada, sauna y jacuzzi: 5 € por persona y día, bajo reserva y pago previo' },
      { label: 'Alrededores', value: 'Supermercados, restaurantes y alquiler de material' },
    ],
    mapsQuery: 'Calle de la Virgen de las Nieves 3, 18196 Sierra Nevada, Granada',
    images: [
      { src: '/images/arttyco/01-salon.webp', alt: 'Salón con sofá gris, mesa baja blanca y cortinas oscuras' },
      { src: '/images/arttyco/02-salon-cocina.webp', alt: 'Salón abierto a la cocina blanca con microondas' },
      { src: '/images/arttyco/03-estudio.webp', alt: 'Vista del estudio completo con litera abatible, cama y cocina' },
      { src: '/images/arttyco/04-litera-salon.webp', alt: 'Litera abatible junto al sofá del salón' },
      { src: '/images/arttyco/05-cocina.webp', alt: 'Cocina blanca con mesa abatible y taburetes' },
      { src: '/images/arttyco/06-dormitorio.webp', alt: 'Dormitorio con cama doble y armario de madera' },
      { src: '/images/arttyco/07-dormitorio-ventana.webp', alt: 'Dormitorio con cama doble junto a la ventana' },
      { src: '/images/arttyco/08-litera-cama.webp', alt: 'Litera abatible y sofá cama preparados para dormir' },
      { src: '/images/arttyco/09-sofa-cama.webp', alt: 'Sofá cama abierto con cojines' },
      { src: '/images/arttyco/10-bano.webp', alt: 'Baño con azulejos blancos, lavabo de madera y espejo redondo' },
      { src: '/images/arttyco/11-ducha.webp', alt: 'Ducha con mampara y toallero negro' },
      { src: '/images/arttyco/12-piscina.webp', alt: 'Piscina climatizada y jacuzzi del edificio' },
      { src: '/images/arttyco/13-edificio.webp', alt: 'Fachada del edificio con nieve' },
      { src: '/images/arttyco/14-vistas.webp', alt: 'Vistas al atardecer con la montaña nevada al fondo' },
    ],
    reservaUrl: '#', // TODO: enlace de reserva
    published: true,
  },
]

export const publishedApartments = apartments.filter((a) => a.published)

export const getApartment = (slug: string) => publishedApartments.find((a) => a.slug === slug)

export const mapsUrl = (a: Apartment) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.mapsQuery)}`
