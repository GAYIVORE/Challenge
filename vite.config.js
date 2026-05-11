import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // You can set logLevel to 'info' or remove it to see helpful build logs again
  logLevel: 'info', 
  plugins: [
    react(),
  ],
  server: {
    // This ensures your local dev environment runs smoothly
    port: 5173,
    host: true
  }
});