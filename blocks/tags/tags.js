import { getMetadata } from '../../scripts/ak.js';

export default function init(el) {
  const tagMeta = getMetadata('article:tag');
  console.log(tagMeta);
  const tagRoot = el.querySelector(':scope > div');
   // tagAll.forEach(tagelement => {
   //     btnelement.remove();
   // });
      const tag = document.createElement('a');
      tag.textContent = tagMeta;
      console.log(tag);
      btn.href = 'http://www.getthis.com';
      btn.setAttribute('aria-label',tagMeta);
      tagRoot.before(tag);
}
