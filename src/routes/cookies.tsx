import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/LegalPage'
import { site } from '@/content/site'

// Página provisional. El texto definitivo depende de las cookies que use la web.
export const Route = createFileRoute('/cookies')({
  head: () => ({
    meta: [
      { title: `Política de cookies · ${site.name}` },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: CookiesPolicy,
})

function CookiesPolicy() {
  return (
    <LegalPage title="Política de cookies">
      <p>Texto pendiente. Aquí irá qué cookies usa la web, para qué sirven y cómo gestionarlas.</p>
    </LegalPage>
  )
}
