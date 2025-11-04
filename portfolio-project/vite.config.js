import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcssPlugin from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcssPlugin(),
  ],
})
