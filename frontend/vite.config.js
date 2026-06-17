import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or @vitejs/plugin-react-swc

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'] // <-- Add this line to bypass the cache trap completely
  }
})