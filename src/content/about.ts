// Textos de la sección "El servicio" y "Sobre Lexa".
// PROVISIONALES: redactados para el diseño; hay que validarlos con la clienta
// (años de experiencia, titulación y biografía son inventados).

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const service = {
  eyebrow: 'El servicio',
  // El titular va en dos frases: la segunda se muestra en cursiva
  statement: ['Tú solo vienes a disfrutar de la nieve.', 'Del resto nos ocupamos nosotros.'],
  // PROVISIONAL: validar con la clienta
  intro: [
    'Lexa Snow & Stay reúne en un solo lugar lo que necesitas para tu escapada a Sierra Nevada: dónde dormir y con quién aprender.',
    'Eliges uno de nuestros apartamentos, reservas tus clases de esquí o snowboard con Lexa y llegas con todo resuelto. Sin buscar alojamiento por un lado y profesor por otro: si tienes dudas sobre fechas, niveles o cualquier detalle, te ayudamos personalmente. Así dedicas el tiempo a lo que importa: disfrutar de la nieve.',
  ],
  points: [
    {
      tag: 'Alojamientos',
      title: 'Apartamentos listos para ti',
      // PROVISIONAL: foto de ejemplo (Unsplash) hasta tener las reales
      image: unsplash('1585803114088-cd027272106a'),
      imageAlt: 'Salón con grandes ventanales y paisaje nevado',
      text: 'Cuatro apartamentos cuidados, con fotos, capacidad y servicios a la vista. Reservas en Airbnb o Booking, con la seguridad de siempre.',
      cta: 'Ver alojamientos',
      href: '#alojamientos',
    },
    {
      tag: 'Clases',
      title: 'Clases a tu medida',
      image: unsplash('1772612212594-a75105a10bd4'),
      imageAlt: 'Persona aprendiendo a hacer snowboard en una pista suave',
      text: 'Snowboard y esquí, de hasta tres personas. Consultas los horarios libres y reservas tu clase en un minuto.',
      cta: 'Ver clases',
      href: '#clases',
    },
    {
      tag: 'Contacto',
      title: 'Trato cercano',
      image: unsplash('1703080138499-f1f0dbc7da42'),
      imageAlt: 'Instructora y alumno esquiando con montañas nevadas al fondo',
      text: '¿Dudas sobre fechas, niveles o algo concreto? Escríbenos y te respondemos personalmente.',
      cta: 'Escríbenos',
      href: '#contacto',
    },
  ],
} as const

export const about = {
  eyebrow: 'Quién está detrás',
  title: 'Hola, soy Lexa',
  // La cita es el titular visible de la sección; la palabra destacada va en cursiva
  quote: 'La montaña se disfruta más cuando te sientes segura en ella.',
  quoteHighlight: 'segura',
  intro:
    'Soy Lexa, instructora titulada de snowboard y esquí. Aprendí a deslizarme en Sierra Nevada y aquí sigo, cada invierno. Grupos pequeños, mucha paciencia y la confianza para que avances a tu ritmo.',
  portraitCaption: 'Instructora titulada',
  facts: [
    { value: '10', suffix: '+', label: 'temporadas en Sierra Nevada' },
    { value: '3', suffix: '', label: 'personas como máximo por clase' },
    { value: '2', suffix: '', label: 'disciplinas: snowboard y esquí' },
  ],
} as const
