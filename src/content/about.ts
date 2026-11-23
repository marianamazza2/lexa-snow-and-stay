// Textos de la sección "El servicio" y "Sobre Lexa".
// PROVISIONALES: redactados para el diseño; hay que validarlos con la clienta
// (años de experiencia, titulación y biografía son inventados).

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const service = {
  eyebrow: 'El servicio',
  statement: 'Tú solo vienes a disfrutar de la nieve. Del resto nos ocupamos nosotros.',
  intro:
    'Lexa Snow & Stay reúne en un solo lugar lo que necesitas para una escapada a Sierra Nevada: dónde dormir y con quién aprender. Eliges tu apartamento, reservas tus clases y llegas con todo resuelto, para dedicar el tiempo a lo que importa: disfrutar de la nieve.',
  points: [
    {
      tag: 'Alojamientos',
      title: 'Apartamentos listos para ti',
      // PROVISIONAL: foto de ejemplo (Unsplash) hasta tener las reales
      image: unsplash('1585803114088-cd027272106a'),
      imageAlt: 'Salón con grandes ventanales y paisaje nevado',
      text: 'Cuatro apartamentos cuidados, con fotos, capacidad y servicios a la vista. Reservas directamente en Airbnb o Booking, con la seguridad de siempre.',
    },
    {
      tag: 'Clases',
      title: 'Clases a tu medida',
      image: unsplash('1772612212594-a75105a10bd4'),
      imageAlt: 'Persona aprendiendo a hacer snowboard en una pista suave',
      text: 'Clases particulares de snowboard y esquí, de hasta tres personas. Consultas los horarios libres en la agenda y reservas tu clase en un minuto.',
    },
    {
      tag: 'Trato cercano',
      title: 'Trato cercano',
      image: unsplash('1703080138499-f1f0dbc7da42'),
      imageAlt: 'Instructora y alumno esquiando con montañas nevadas al fondo',
      text: 'Si tienes dudas sobre fechas, niveles o algo concreto que necesites, escríbenos y te respondemos personalmente.',
    },
  ],
} as const

export const about = {
  eyebrow: 'Quién está detrás',
  title: 'Hola, soy Lexa',
  paragraphs: [
    'Soy instructora titulada de snowboard y esquí, y llevo más de diez temporadas enseñando en Sierra Nevada. Aquí aprendí a deslizarme y aquí sigo, cada invierno, con la misma ilusión del primer día.',
    'Mis clases son tranquilas y cercanas: grupos pequeños, mucha paciencia y la confianza necesaria para que avances a tu ritmo. Me encanta ver cómo alguien que llegó con miedo termina bajando la pista con una sonrisa.',
  ],
  quote: 'La montaña se disfruta más cuando te sientes segura en ella.',
  facts: [
    { prefix: '+', value: 10, label: 'temporadas en Sierra Nevada' },
    { prefix: '', value: 3, label: 'personas como máximo por clase' },
    { prefix: '', value: 2, label: 'disciplinas: snowboard y esquí' },
  ],
} as const
