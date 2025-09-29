/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    modulePreload: {
      polyfill: false,
    },
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 2,
        drop_console: true,
        drop_debugger: true,
        // pure_funcs: ['console.log'],
        // ถ้าต้องการเก็บ console.error ให้คอมเมนต์บรรทัดบนแล้วใช้ pure_funcs แทน
        pure_funcs: ['console.info', 'console.debug', 'console.warn'],
      },
      format: {
        comments: false, // ถ้าต้องการเก็บ console.log ให้คอมเมนต์บรรทัดบนแล้วใช้ pure_funcs แทน
      },
    },
    rollupOptions: {
      output: {
        // ชื่อไฟล์แบบแฮช พร้อมแคชดี ๆ
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',

        manualChunks: {
          react: ['react', 'react-dom'],
          tanstack: [
            '@tanstack/react-query',
            '@tanstack/react-router',
            '@tanstack/react-router-devtools',
          ],
          i18n: [
            'i18next',
            'react-i18next',
            'i18next-http-backend',
            'i18next-browser-languagedetector',
          ],
          forms: ['react-hook-form', '@hookform/resolvers', 'yup'],
          radix: [],
          ui: [],
          net: ['axios'],
          icons: ['omoo-icons'],
          utils: ['react-scan', 'clsx'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    // preload deps ที่ใช้ตอน dev เท่านั้น (prod จะใช้ rollup)
    include: ['react', 'react-dom'],
  },
})
