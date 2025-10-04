import { defineConfig } from "vite";
import inlining from "vite-plugin-html-inline-sources";
// import browserslist from "browserslist";
// import { browserslistToTargets } from "lightningcss";

export default defineConfig({
  css: {
    transformer: "lightningcss",
    // lightningcss: {
    //   targets: browserslistToTargets(browserslist(">= 0.25%")),
    // },
  },
  build: {
    cssMinify: "lightningcss",
  },
  plugins: [inlining()],
});
