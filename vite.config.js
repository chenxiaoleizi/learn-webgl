import path from "path"
import { defineConfig } from "vite";

export default defineConfig(({command, mode, ssrBuild}) => {

  return {
    resolve: {
      alias: {
        "@": path.join(__dirname, "src")
      }
    },
    server: {
      port: 8080
    }
  }
})