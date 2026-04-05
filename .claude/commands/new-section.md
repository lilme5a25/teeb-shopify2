---
description: Scaffold a new Shopify theme section with Liquid, settings schema, and CSS
---

Create a new Shopify theme section. The section name is: $ARGUMENTS

Generate the following:

1. **`sections/<name>.liquid`** — full section file including:
   - CSS stylesheet tag for a new `<name>.css` asset
   - Padding style block using `section.settings.padding_top` and `padding_bottom`
   - Semantic HTML wrapped in a `<div class="color-{{ section.settings.color_scheme }} gradient">`
   - A `page-width` inner container
   - A complete `{% schema %}` block with:
     - `color_scheme` color_scheme setting (default: scheme-1)
     - `padding_top` and `padding_bottom` range settings (0–100px, default 36)
     - Section padding header
     - A named preset

2. **`assets/<name>.css`** — empty CSS file with a comment header

Follow Dawn theme conventions exactly: use existing CSS variables (`--color-foreground`, `--color-background`, `--color-button`, etc.), match the indentation and coding style of existing sections like `sections/featured-collection.liquid`.
