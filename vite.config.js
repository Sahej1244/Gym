import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // In local dev, forward /api/* to the Vercel dev server (run `vercel dev`
      // alongside `npm run dev`, or just use `vercel dev` alone which serves both).
    },
  },
});
