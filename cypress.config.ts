import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://yumemi-prefectures-population-viz.vercel.app/",
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});