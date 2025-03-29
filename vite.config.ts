import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  build:{
    outDir:'out/ui'
  },
  server: {
    watch: {
      ignored: ['**/database.db/**']
    }
  },
  base: './',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/ui"),
    },
  },
})
