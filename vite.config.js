import path from "path"
import { defineConfig } from "vite";
import globalStyle from '@originjs/vite-plugin-global-style';

export default defineConfig(({command, mode, ssrBuild}) => {

  return {
    resolve: {
      alias: {
        "@": path.join(__dirname, "src")
      }
    },
    server: {
      port: 8080
    },
    plugins: [
      globalStyle({
        sourcePath: "./src/style/"
      })
    ]
  }
})