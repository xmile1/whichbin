import { defineConfig } from "vite";
import { resolve } from "path";
import mkcert from "vite-plugin-mkcert";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: { https: true },
  plugins: [vue(), mkcert()],
});
