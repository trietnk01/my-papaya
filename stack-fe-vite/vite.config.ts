import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: { "process.env.VITE_BACKEND_URI": JSON.stringify(process.env.VITE_BACKEND_URI) },
  server: {
    port: parseInt(process.env.VITE_PORT ? process.env.VITE_PORT : "3001")
  },
  preview: {
    port: parseInt(process.env.VITE_PORT ? process.env.VITE_PORT : "80")
  }
});
