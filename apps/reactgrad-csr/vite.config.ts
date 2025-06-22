import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import schema from '@reactgrad/schema/dist/app-schema.json' assert { type: 'json' };

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html
          .replace(/%APP_TITLE%/g, schema.title || 'ReactGrad App')
          .replace(/%APP_DESCRIPTION%/g, schema.description || '')
      }
    }
  ]
})
