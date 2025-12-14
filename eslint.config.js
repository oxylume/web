// @ts-check

import antfu from "@antfu/eslint-config"

export default antfu({
  typescript: true,
  astro: true,
  svelte: true,
  unocss: true,
  stylistic: {
    quotes: "double",
  },
})
