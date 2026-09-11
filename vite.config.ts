import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    watch: {
      // Browser test profiles contain locked files on Windows.
      ignored: ['**/.browser-check/**', '**/.vite-dev*.log'],
    },
  },
})
