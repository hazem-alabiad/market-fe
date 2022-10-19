/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="redux-persist" />

declare module "*.svg" {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}
