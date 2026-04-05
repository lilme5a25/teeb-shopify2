---
description: Add a custom badge to product cards (e.g. "New", "Best Seller", "Limited")
---

Add a custom product badge to the store's product cards. The badge details are: $ARGUMENTS

Follow these steps:

1. Read `snippets/card-product.liquid` to understand the current badge structure (both inner badge block ~line 128 and outer badge block ~line 646)
2. Read `assets/cro-enhancements.css` to understand the current badge CSS
3. Add the new badge in BOTH badge blocks in `card-product.liquid`, using the product's metafields or tags as the trigger condition. The badge should:
   - Use a Shopify product tag (e.g. `card_product.tags contains 'new'`) OR a metafield as the condition
   - Sit alongside existing sold-out and sale badges without replacing them
   - Use a distinct color that doesn't clash with existing badges
4. Add CSS for the new badge class in `assets/cro-enhancements.css`
5. Ensure the badge placement respects the existing `if/elsif/endif` structure — do NOT place the new badge inside an open elsif branch

Show the exact lines changed in each file.
