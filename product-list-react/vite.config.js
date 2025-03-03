import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import copy from "rollup-plugin-copy";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    copy({
      targets: [{ src: "data/data.json", dest: "dist/data" }],
      hook: "writeBundle",
    }),
  ],
});
