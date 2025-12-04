/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }) as any,
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
        pure_funcs: ['console.info', 'console.debug', 'console.warn'],
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks: (id) => {
          // React core
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom')
          ) {
            return 'react'
          }

          // TanStack
          if (
            id.includes('@tanstack/react-query') ||
            id.includes('@tanstack/react-router') ||
            id.includes('@tanstack/react-router-devtools')
          ) {
            return 'tanstack'
          }

          // i18n
          if (
            id.includes('i18next') ||
            id.includes('react-i18next') ||
            id.includes('i18next-http-backend') ||
            id.includes('i18next-browser-languagedetector')
          ) {
            return 'i18n'
          }

          // Forms
          if (
            id.includes('react-hook-form') ||
            id.includes('@hookform/resolvers') ||
            id.includes('yup')
          ) {
            return 'forms'
          }

          // Network
          if (id.includes('axios')) {
            return 'net'
          }

          // Utils
          if (id.includes('react-scan') || id.includes('clsx')) {
            return 'utils'
          }

          // 🔥 IMPORTANT: Split icons into separate chunk
          if (id.includes('omoo-icons')) {
            return 'icons'
          }

          // Radix UI - split each component separately for better code-splitting
          if (id.includes('@radix-ui')) {
            const match = id.match(/@radix-ui\/react-([^/]+)/)
            if (match) {
              return `radix-${match[1]}`
            }
            return 'radix'
          }

          // The Omelet UI - split each component separately for better code-splitting
          if (id.includes('the-omelet-ui')) {
            const match = id.match(/the-omelet-ui\/react-([^/]+)/)
            if (match) {
              return `omelet-${match[1]}`
            }
            return 'omelet'
          }

          // Other node_modules
          if (id.includes('node_modules')) {
            return 'vendor'
          }
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
    include: ['react', 'react-dom'],
  },
})
