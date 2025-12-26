import { defineConfig, presetIcons, presetWind3, symbols, transformerCompileClass, transformerDirectives, transformerVariantGroup } from "unocss"

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons(),
  ],
  rules: [
    ["no-scrollbar", [
      { "scrollbar-width": "none" },
      {
        [symbols.selector]: selector => `${selector}::-webkit-scrollbar`,
        display: "none",
      },
    ]],
  ],
  theme: {
    colors: {
      background: "var(--background)",
      primary: "var(--primary)",
      secondary: "var(--secondary)",
      accent: "var(--accent)",
      border: "var(--border)",
    },
    spacing: {
      control: "2.5rem",
    },
  },
  transformers: [
    transformerVariantGroup(),
    transformerCompileClass(),
    transformerDirectives(),
  ],
})
