/* eslint-disable spaced-comment */
/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        babelrc: true,
      },
    }),
    svgr(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "test/setup.ts",
  },
});
