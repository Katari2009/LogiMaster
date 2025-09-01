import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This 'define' block makes environment variables available in your client-side code.
  // Vercel sets process.env.API_KEY on the build server, and this line safely
  // replaces `process.env.API_KEY` in your code with the actual string value.
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
})
