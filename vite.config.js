import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'  // Import path for alias resolution

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Define @ as alias for src folder
    },
  },
  base: '/NewDashboard/',  // Add the base to match your GitHub repository name
})
