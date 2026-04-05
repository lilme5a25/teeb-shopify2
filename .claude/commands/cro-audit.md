---
description: Audit the store's CRO enhancements — check all Phase 1/2/3 implementations are intact and working correctly
---

Audit the CRO enhancements across the MyStore Shopify theme. Check each of the following:

**Phase 1 — Quick wins**
- `snippets/price.liquid`: Sale badge shows `-X%` not generic "Sale" for single-price products
- `snippets/card-product.liquid`: Both badge blocks (inner + outer) show discount % and low-stock badge correctly, all `if/elsif/endif` tags are properly closed
- `snippets/buy-buttons.liquid`: Trust signals strip renders after ATC button, low-stock badge shows above button, `cro-enhancements.css` is loaded
- `snippets/trust-signals.liquid`: exists and contains lock, return, truck icons + payment types loop

**Phase 2 — Medium impact**
- `config/settings_schema.json`: `free_shipping_threshold` number setting exists in the Cart section
- `snippets/cart-drawer.liquid`: Free shipping progress bar renders when setting > 0, upsell placeholder div exists with `data-product-id`, both `cro-enhancements.css` and `cart-upsell.js` are loaded
- `assets/cart-upsell.js`: exists and contains `CartDrawerUpsell` class + MutationObserver reinit
- `sections/main-product.liquid`: Sticky ATC bar HTML exists before `</product-info>`, `sticky-atc.js` is loaded
- `assets/sticky-atc.js`: exists and contains `StickyATCBar` class with IntersectionObserver

**Phase 3 — Featured product buttons**
- `sections/featured-collection.liquid`: passes `show_featured_buttons: true` to `card-product`
- `snippets/card-product.liquid`: `show_featured_buttons` block renders ATC + Buy Now buttons with `btn-shake-hover` and `btn-pulse` classes

**CSS**
- `assets/cro-enhancements.css`: exists and contains all sections (Phase 1, Phase 2, animated buttons, premium filter bar)
- `sections/main-collection-product-grid.liquid`: loads `cro-enhancements.css`

Report any missing pieces or regressions and fix them.
