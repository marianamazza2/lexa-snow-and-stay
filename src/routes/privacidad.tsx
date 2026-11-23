import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/LegalPage'
import { site } from '@/content/site'

// Página provisional. El texto legal definitivo (RGPD/LOPDGDD) lo aportará la clienta
// o se redactará en el paso de páginas legales.
export const Route = createFileRoute('/privacidad')({
  head: () => ({
    meta: [
      { title: `Política de privacidad · ${site.name}` },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: Privacy,
})

function Privacy() {
  return (
    <LegalPage title="Política de privacidad">
      <p>
        Texto pendiente. Aquí irá la información sobre el tratamiento de los datos que se envían a través del
        formulario de contacto.
      </p>
    </LegalPage>
  )
}
