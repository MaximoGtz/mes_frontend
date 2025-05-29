import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: true, // Esto permite usar la IP local
  //   port: 5173, // Puedes cambiarlo si quieres
  // },
});
