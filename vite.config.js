import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Routine-Scraper-Uni/', // 🔥 correct repo name
  plugins: [react(), tailwindcss()],
})