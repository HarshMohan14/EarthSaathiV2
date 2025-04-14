import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  optimizeDeps: {
    include: ['framer-motion'], // Explicitly include problematic deps
    force: true, // Always re-bundle on startup during dev
  }
})
