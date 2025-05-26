import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cartographer } from "@replit/vite-plugin-cartographer";
import runtimeErrorModal from "@replit/vite-plugin-runtime-error-modal";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), cartographer(), runtimeErrorModal()],
  root: "client",
  build: {
    outDir: "../dist",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "client", "src"),
    },
  },
  server: {
    port: 5000,
    host: "0.0.0.0"
  },
});