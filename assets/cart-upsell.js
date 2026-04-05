/**
 * Cart Drawer Upsell
 * Fetches product recommendations based on the first cart item and renders
 * them inside the cart drawer. Re-initializes after every cart update via
 * Dawn's pubsub system.
 */

class CartDrawerUpsell {
  constructor(container) {
    this.container = container;
    this.productId = container.dataset.productId;
    this.moneyFormat = container.dataset.moneyFormat || '{{amount}}';

    if (!this.productId) return;
    this.fetchRecommendations();
  }

  fetchRecommendations() {
    const root = window.Shopify && window.Shopify.routes && window.Shopify.routes.root
      ? window.Shopify.routes.root
      : '/';

    const url = `${root}recommendations/products.json?product_id=${this.productId}&limit=3&intent=related`;

    fetch(url)
      .then((response) => {
        if (!response.ok) return;
        return response.json();
      })
      .then((data) => {
        if (!data || !data.products || data.products.length === 0) return;
        this.render(data.products);
      })
      .catch(() => {
        // Silent fail — upsell is non-critical
      });
  }

  formatMoney(cents) {
    // Use Shopify's built-in formatter when available
    if (window.Shopify && typeof window.Shopify.formatMoney === 'function') {
      return window.Shopify.formatMoney(cents, this.moneyFormat);
    }
    // Fallback: simple dollar format
    return '$' + (cents / 100).toFixed(2);
  }

  render(products) {
    const list = this.container.querySelector('.cart-drawer__upsell-list');
    const inner = this.container.querySelector('.cart-drawer__upsell-inner');
    if (!list || !inner) return;

    list.innerHTML = products
      .map((product) => {
        const variant = product.variants[0];
        const price = this.formatMoney(variant.price);
        const imageUrl = product.featured_image
          ? product.featured_image.url.split('?')[0] + '?width=120'
          : null;
        const imageHtml = imageUrl
          ? `<img src="${imageUrl}" alt="${this.escapeHtml(product.title)}" width="60" height="60" loading="lazy" class="cart-drawer__upsell-image">`
          : '';

        return `
          <li class="cart-drawer__upsell-item">
            <a href="${product.url}" class="cart-drawer__upsell-link">
              ${imageHtml}
              <div class="cart-drawer__upsell-info">
                <p class="cart-drawer__upsell-title">${this.escapeHtml(product.title)}</p>
                <p class="cart-drawer__upsell-price">${price}</p>
              </div>
            </a>
          </li>
        `;
      })
      .join('');

    inner.removeAttribute('hidden');
  }

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}

function initCartUpsell() {
  const container = document.getElementById('CartDrawer-Upsell');
  if (!container) return;
  // Reset inner content so re-init fetches fresh recommendations
  const inner = container.querySelector('.cart-drawer__upsell-inner');
  if (inner) {
    inner.setAttribute('hidden', '');
    const list = inner.querySelector('.cart-drawer__upsell-list');
    if (list) list.innerHTML = '';
  }
  new CartDrawerUpsell(container);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initCartUpsell);

// Re-initialize after Dawn re-renders the cart drawer contents
// Dawn dispatches a 'cart:refresh' custom event and uses pubsub internally.
// We hook both the custom DOM event and MutationObserver as a fallback.
document.addEventListener('cart:refresh', initCartUpsell);

// MutationObserver fallback: watch for the upsell container being re-inserted
// after Dawn's section re-render replaces drawer HTML.
const cartDrawerObserver = new MutationObserver(() => {
  const container = document.getElementById('CartDrawer-Upsell');
  if (container && !container.dataset.initialized) {
    container.dataset.initialized = 'true';
    new CartDrawerUpsell(container);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const drawer = document.getElementById('CartDrawer');
  if (drawer) {
    cartDrawerObserver.observe(drawer, { childList: true, subtree: true });
  }
});
