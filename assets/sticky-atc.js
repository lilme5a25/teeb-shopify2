/**
 * Sticky Add-to-Cart Bar
 * Mobile-only bar that slides in when the main ATC button scrolls out of view.
 * Uses IntersectionObserver for efficient scroll tracking.
 * Clicking the bar button either triggers the real ATC button (single-variant)
 * or scrolls the user back up to the variant selector (multi-variant).
 */

class StickyATCBar {
  constructor(bar) {
    this.bar = bar;
    this.targetButtonId = bar.dataset.targetButton;
    this.hasOnlyDefaultVariant = bar.dataset.hasOnlyDefaultVariant === 'true';
    this.targetButton = document.getElementById(this.targetButtonId);
    this.stickyButton = bar.querySelector('.sticky-atc-bar__button');

    if (!this.targetButton) return;

    this.bindEvents();
    this.observe();
  }

  observe() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;
          this.bar.classList.toggle('is-visible', !isVisible);
          this.bar.setAttribute('aria-hidden', isVisible ? 'true' : 'false');
        });
      },
      {
        threshold: 0,
        rootMargin: '0px',
      }
    );

    this.observer.observe(this.targetButton);
  }

  bindEvents() {
    if (!this.stickyButton) return;

    this.stickyButton.addEventListener('click', () => {
      if (this.hasOnlyDefaultVariant) {
        // Single variant — trigger the real ATC button directly
        this.targetButton.click();
      } else {
        // Multi-variant — scroll smoothly to the variant picker
        const productInfo = document.getElementById(this.targetButton.closest('[id^="ProductInfo-"]')?.id)
          || this.targetButton.closest('.product__info-container');

        if (productInfo) {
          productInfo.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          this.targetButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });

    // Keep the sticky button's disabled/sold-out state in sync with the real button
    this.syncButtonState();
    this.targetButton.addEventListener('variantChange', () => this.syncButtonState());

    // Dawn fires a custom 'variant:change' on product-info; observe via MutationObserver
    // as a fallback to keep the sticky button label current
    const productInfo = document.getElementById(`MainProduct-${this.targetButtonId.replace('ProductSubmitButton-', '')}`);
    if (productInfo) {
      const mutationObserver = new MutationObserver(() => this.syncButtonState());
      mutationObserver.observe(this.targetButton, {
        attributes: true,
        attributeFilter: ['disabled'],
        childList: true,
        subtree: true,
      });
    }
  }

  syncButtonState() {
    if (!this.stickyButton) return;
    const isDisabled = this.targetButton.disabled;
    this.stickyButton.disabled = isDisabled;

    // Sync the visible text from the real button's first <span>
    const realLabel = this.targetButton.querySelector('span:not(.loading__spinner)');
    if (realLabel && realLabel.textContent.trim() && this.hasOnlyDefaultVariant) {
      this.stickyButton.textContent = realLabel.textContent.trim();
    }
  }
}

// Init on DOM ready — only runs on pages that have a sticky ATC bar
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.sticky-atc-bar').forEach((bar) => new StickyATCBar(bar));
});
