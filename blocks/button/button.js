export default function decorate(block) {
  // Destructure expected children of the block
  const [
    btn,
    buttonStyle,
    addIcon,
    iconPosition,
    iconLogo,
    inverseStyle,
    iconSize,
    openInNewTabBool,
    id,
  ] = [...block.children];
  const cta = block?.querySelector('a.button');
  cta.classList.add(buttonStyle.textContent.trim());
  if (!cta) return;

  // Wrap button text in a <span> to allow iconSize placement
  if (!cta.querySelector('span')) {
    const text = cta.textContent.trim();
    cta.textContent = '';
    const span = document.createElement('span');
    span.textContent = text;
    cta.appendChild(span);
  }

  // Open in new tab logic
  if (openInNewTabBool?.textContent.trim().toLowerCase() === 'true') {
    cta.setAttribute('target', '_blank');
    cta.setAttribute('rel', 'noopener noreferrer');
  }
  // Apply inverse style
  if (inverseStyle?.textContent.trim().toLowerCase() === 'true') {
    cta.classList.add('iblack');
  } else {
    cta.classList.remove('iblack');
  }
  // Apply size class (e.g., 'large', 'small')
  const sizeClass = iconSize?.textContent.trim().toLowerCase();

  if (['large', 'small'].includes(sizeClass)) {
    block.classList.add(sizeClass);
  }

  // Handle iconSize placement (e.g., 'leading', 'trailing')
  const iconPlacement = iconPosition?.textContent.trim().toLowerCase();
  if (['leading', 'trailing'].includes(iconPlacement)) {
    block.classList.add(iconPlacement);
  }

  // Clone and insert the SVG icon into the CTA
  if (addIcon.textContent.trim().toLowerCase() === 'true') {
    const imgEl = iconLogo?.querySelector('span img');
    if (imgEl) {
      fetch(imgEl.src)
        .then((res) => res.text())
        .then((svgText) => {
          const parser = new DOMParser();
          const svgEl = parser.parseFromString(svgText, 'image/svg+xml').querySelector('svg');
          if (svgEl) {
            svgEl.setAttribute('aria-hidden', 'true'); // decorative only

            if (iconPlacement === 'leading') {
              cta.insertBefore(svgEl, cta.firstChild);
            } else {
              cta.appendChild(svgEl);
            }
          }
        })
        .catch((err) => console.error('Failed to load SVG:', err));
    }
  }

  // Remove config elements from DOM after use
  const elementsToRemove = [
    buttonStyle,
    addIcon,
    iconPosition,
    iconLogo,
    inverseStyle,
    iconSize,
    openInNewTabBool,
    id,
  ];

  elementsToRemove.forEach((el) => {
    if (el && block.contains(el)) {
      block.removeChild(el);
    }
  });
}
