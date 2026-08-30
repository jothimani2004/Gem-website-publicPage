import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://67.211.219.18',
        changeOrigin: true,
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          reactVendor: ['react', 'react-dom', 'react-router-dom'],
          reduxVendor: ['@reduxjs/toolkit', 'react-redux'],
          uiVendor: ['framer-motion', 'embla-carousel-react', 'embla-carousel-autoplay', 'swiper', 'react-icons']
        }
      }
    }
  }
})
