import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main className="grid min-h-dvh place-items-center bg-nieve p-6 text-pizarra">
      <h1 className="font-serif text-5xl tracking-[0.18em]">LEXA</h1>
    </main>
  )
}
