import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    // Genera HTML estático de cada página (home, fichas de apartamentos, legales)
    // para que Google y las vistas previas de Instagram/WhatsApp lean sus metadatos.
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true, failOnError: true },
    }),
    viteReact(), // debe ir después de tanstackStart()
  ],
})
