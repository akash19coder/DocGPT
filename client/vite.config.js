import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/pdf.worker.min.js": {
        target: "https://cdnjs.cloudflare.com",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/pdf.worker.min.js/,
            "/ajax/libs/pdf.js/4.4.168/pdf.worker.min.js"
          ),
      },
    },
  },
});
