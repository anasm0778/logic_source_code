/**
 * Global utility to replace currency "D " patterns with đồng symbol image
 * This function can be called on page load to replace all instances
 */
export const replaceCurrencyDSymbol = () => {
  if (typeof window === 'undefined') return;

  // Find all text nodes containing "D " pattern
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  );

  const textNodes: Text[] = [];
  let node: Node | null = walker.nextNode();
  
  while (node) {
    if (node.textContent && /D\s+\d/.test(node.textContent)) {
      textNodes.push(node as Text);
    }
    node = walker.nextNode();
  }

  // Replace "D " with image in each text node
  textNodes.forEach((textNode) => {
    const parent = textNode.parentElement;
    if (!parent) return;

    const text = textNode.textContent || '';
    const parts = text.split(/(D\s+)/g);

    if (parts.length > 1) {
      // Create document fragment with replacements
      const fragment = document.createDocumentFragment();
      
      parts.forEach((part, index) => {
        if (part.match(/^D\s+$/)) {
          // Create image element
          const img = document.createElement('img');
          img.src = '/dong-symbol.png';
          img.alt = '₫';
          img.style.display = 'inline-block';
          img.style.verticalAlign = 'middle';
          img.style.width = '16px';
          img.style.height = '16px';
          img.style.marginRight = '2px';
          fragment.appendChild(img);
        } else if (part) {
          fragment.appendChild(document.createTextNode(part));
        }
      });

      parent.replaceChild(fragment, textNode);
    }
  });
};

/**
 * Initialize replacement on DOM ready
 */
export const initCurrencyReplacement = () => {
  if (typeof window === 'undefined') return;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceCurrencyDSymbol);
  } else {
    replaceCurrencyDSymbol();
  }

  // Also run after a short delay to catch dynamically loaded content
  setTimeout(replaceCurrencyDSymbol, 1000);
};

