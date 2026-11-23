// Textos de la sección "Clases".
// PROVISIONALES: redactados para el diseño. Duraciones, punto de encuentro y la
// textos son de ejemplo y hay que validarlos con la clienta.
// Fotos de Unsplash (licencia libre), se sustituirán por las reales.

const unsplash = (id: string, w = 1000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const classesIntro = {
  eyebrow: 'Clases',
  title: 'Aprende con Lexa',
  // El titular se muestra en dos líneas; la segunda en cursiva
  titleLines: ['Aprende', 'con Lexa.'],
  text: 'Clases particulares de snowboard y esquí, de hasta tres personas, en las pistas de Sierra Nevada. Vamos a tu ritmo, con atención de verdad y la confianza de alguien que conoce cada rincón de la montaña.',
}

export type ClassMode = {
  id: string
  discipline: 'Snowboard' | 'Esquí'
  title: string
  level: string
  text: string
  image: string
  imageAlt: string
}

export const classModes: ClassMode[] = [
  {
    id: 'snow-iniciacion',
    discipline: 'Snowboard',
    title: 'Iniciación',
    level: 'Desde cero',
    text: 'Tus primeros pasos sobre la tabla: equilibrio, frenar y tus primeros giros con seguridad.',
    image: unsplash('1772612212594-a75105a10bd4'),
    imageAlt: 'Persona aprendiendo a hacer snowboard en una pista suave',
  },
  {
    id: 'snow-perfeccionamiento',
    discipline: 'Snowboard',
    title: 'Perfeccionamiento',
    level: 'Ya bajas pistas',
    text: 'Giros más limpios, control de velocidad y confianza para disfrutar de cualquier pista.',
    image: unsplash('1771271949519-d807aa88a7b8'),
    imageAlt: 'Snowboarder trazando una curva en la pista',
  },
  {
    id: 'snow-freestyle',
    discipline: 'Snowboard',
    title: 'Iniciación al freestyle',
    level: 'Nivel intermedio',
    text: 'Primeros saltos, ollies y cajones del snowpark, paso a paso y con la técnica correcta.',
    image: unsplash('1776789472329-2766e6f4ee17'),
    imageAlt: 'Snowboarder saltando bajo un cielo azul despejado',
  },
  {
    id: 'ski-iniciacion',
    discipline: 'Esquí',
    title: 'Iniciación',
    level: 'Desde cero',
    text: 'Aprende a ponerte los esquís, frenar en cuña y encadenar tus primeros giros.',
    image: unsplash('1703080138499-f1f0dbc7da42'),
    imageAlt: 'Instructora y alumno esquiando con montañas nevadas al fondo',
  },
]

export const howItWorks = [
  {
    title: 'Elige tu clase',
    text: 'Snowboard o esquí, según tu nivel. Si dudas, escríbenos y te orientamos.',
  },
  {
    title: 'Reserva tu hora',
    text: 'En la agenda ves los horarios libres y reservas la clase en un minuto.',
  },
  {
    title: 'Nos vemos en pistas',
    text: 'Te esperamos en el punto de encuentro con todo listo para empezar.',
  },
]

export const classesCta = {
  title: '¿Te animas a tu primera bajada?',
  text: 'Consulta las horas disponibles y reserva tu clase directamente en la agenda.',
  image: unsplash('1685694590593-a0fe68b8d9b4', 2000),
}
