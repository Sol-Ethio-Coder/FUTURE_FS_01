import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'https://portfolio-backend-143v.onrender.com')
  },
=======
>>>>>>> eb4c480b271830c9c1915fffbad6faa3fec99d70
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
<<<<<<< HEAD
=======
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
>>>>>>> eb4c480b271830c9c1915fffbad6faa3fec99d70
  }
})