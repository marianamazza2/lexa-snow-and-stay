// Datos generales del sitio. Los marcados con TODO esperan el contenido de la clienta.
export const site = {
  name: 'Lexa Snow & Stay',
  location: 'Sierra Nevada · Granada',
  // TODO: enlace real a la agenda de reservas de clases
  bookingUrl: '#clases',
  // TODO: usuario real de Instagram
  instagramUrl: 'https://www.instagram.com/',
  instagramHandle: '@lexasnowandstay', // TODO: confirmar
  // TODO: email real de la clienta (donde llegan las consultas)
  email: 'hola@lexasnowandstay.com',
  // TODO: endpoint del servicio de formularios (p. ej. Formspree: https://formspree.io/f/XXXX).
  // Mientras esté vacío, el formulario funciona en modo demostración y no envía nada.
  formEndpoint: '',
  nav: [
    { label: 'Alojamientos', href: '#alojamientos' },
    { label: 'Clases', href: '#clases' },
    { label: 'Sobre Lexa', href: '#lexa' },
    { label: 'Contacto', href: '#contacto' },
  ],
  legal: [
    { label: 'Aviso legal', href: '/aviso-legal' },
    { label: 'Privacidad', href: '/privacidad' },
    { label: 'Cookies', href: '/cookies' },
  ],
} as const
