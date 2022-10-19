/* eslint-disable spaced-comment */
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="redux-persist" />
/// <reference types="vitest" />

declare module "*.svg" {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

import { defineConfig } from "vite";

export default defineConfig({
  test: {},
});
