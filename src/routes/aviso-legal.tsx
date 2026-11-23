import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/LegalPage'
import { site } from '@/content/site'

// Página provisional. El texto definitivo (LSSI) necesita los datos de la titular: nombre y NIF.
export const Route = createFileRoute('/aviso-legal')({
  head: () => ({
    meta: [
      { title: `Aviso legal · ${site.name}` },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: LegalNotice,
})

function LegalNotice() {
  return (
    <LegalPage title="Aviso legal">
      <p>Texto pendiente. Aquí irán los datos de la titular de la web y las condiciones de uso.</p>
    </LegalPage>
  )
}
