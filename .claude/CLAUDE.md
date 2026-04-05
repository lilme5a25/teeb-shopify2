# MyStore — Shopify Theme (Dawn 15.4.1)

## Project Overview
This is a custom Shopify theme based on Dawn 15.4.1. All CRO enhancements, filters, and animated buttons are custom additions layered on top of the base theme.

## Critical Rules

### Never touch Dawn core files for styling
All custom CSS goes in `assets/cro-enhancements.css` only. Never edit `assets/base.css` or any `assets/component-*.css` files directly — those are Dawn core files that break on theme updates.

### Liquid tag pairing is mandatory
Every `{% if %}`, `{% elsif %}`, `{% for %}`, `{% unless %}`, `{% case %}`, and `{% form %}` MUST have a matching closing tag. The most common mistake: placing `{% liquid %}` blocks or new conditional logic inside an open `{% elsif %}` branch instead of after `{% endif %}`.

**Wrong pattern (causes Shopify validation errors):**
```liquid
{%- elsif condition -%}
  <span>content</span>
{%- liquid        ← still inside elsif! %}
  assign x = true
-%}
{%- if x -%}...{%- endif -%}   ← this endif closes x, not the outer if/elsif
```

**Correct pattern:**
```liquid
{%- elsif condition -%}
  <span>content</span>
{%- endif -%}     ← close the outer if/elsif first
{%- liquid
  assign x = true
-%}
{%- if x -%}...{%- endif -%}
```

### card-product.liquid has TWO badge blocks
`snippets/card-product.liquid` contains two separate badge areas:
- **Inner badge** (~line 128): inside `.card__inner`, shown for standard card style
- **Outer badge** (~line 646): inside outer `.card__content`, shown for media card style

Any badge change must be applied to BOTH blocks identically.

## Custom Files Added
| File | Purpose |
|---|---|
| `assets/cro-enhancements.css` | ALL custom CSS — phases 1, 2, 3, filter bar, animations |
| `assets/sticky-atc.js` | Sticky mobile ATC bar (IntersectionObserver) |
| `assets/cart-upsell.js` | Cart drawer product recommendations |
| `snippets/trust-signals.liquid` | Trust strip (lock, returns, shipping, payment icons) |

## Theme Settings Added
- **Cart → Free Shipping Bar → `free_shipping_threshold`**: Set in Shopify Admin → Online Store → Themes → Customize → Theme Settings → Cart

## CRO Phases Implemented
- **Phase 1**: Discount % badge, trust signals, low-stock urgency badges
- **Phase 2**: Free shipping progress bar, cart upsell, sticky mobile ATC
- **Phase 3 (partial)**: Featured product animated ATC + Buy Now buttons
- **Premium Filter Bar**: Pill-shaped filters, refined typography, upgraded sort dropdown

## CSS Loading Per Section
- `snippets/buy-buttons.liquid` — loads `cro-enhancements.css` (PDP)
- `snippets/card-product.liquid` — loads `cro-enhancements.css` (collection cards, via `skip_styles` guard)
- `snippets/cart-drawer.liquid` — loads `cro-enhancements.css` + `cart-upsell.js`
- `sections/main-collection-product-grid.liquid` — loads `cro-enhancements.css` (filter bar)
