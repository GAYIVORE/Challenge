import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'info',
  plugins: [react()],
  resolve: {
    alias: {
      // This maps the "@" symbol to your "src" folder
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: true
  }
<<<<<<< HEAD
})
=======
})
>>>>>>> 87f96a4 (Final cleanup: Updated index.html and removed remaining Base44 references)
