// @ts-check

import svelte from "@astrojs/svelte"
import { defineConfig, envField } from "astro/config"
import unocss from "unocss/astro"

export default defineConfig({
  integrations: [
    svelte(),
    unocss({
      injectReset: true,
    }),
  ],
  env: {
    schema: {
      API_URL: envField.string({ context: "client", access: "public", default: "http://localhost:8081" }),
      GATEWAY_URL: envField.string({ context: "client", access: "public", default: "http://localhost:8082" }),
    },
  },
})
