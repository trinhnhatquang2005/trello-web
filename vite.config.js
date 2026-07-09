import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import svgr from 'vite-plugin-svgr'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // babel({ presets: [reactCompilerPreset()] }),
    svgr()
  ],
  resolve: {
    alias: {
      '~': new URL('./src', import.meta.url).pathname
    }
  },
  define: {
    'import.meta.env.BUILD_MODE': JSON.stringify(process.env.BUILD_MODE)
  }
})
