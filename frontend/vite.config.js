import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __firebase_config: JSON.stringify(JSON.stringify({
      apiKey: "demo-key",
      authDomain: "demo.firebaseapp.com",
      projectId: "zenith-demo"
    })),
    __app_id: JSON.stringify("zenith-v5-dev"),
    __initial_auth_token: "undefined"
  }
})
