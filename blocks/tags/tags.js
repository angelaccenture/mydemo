import { getMetadata } from '../../scripts/ak.js';

export default function init(el) {
  const tagMeta = getMetadata('article:tag');
  console.log(tagMeta);
  const tagRoot = el.querySelector(':scope > div');

      const tag = document.createElement('a');
      tag.textContent = tagMeta;
      console.log(tag);
      //btn.href = btndata.link.text;
      //btn.setAttribute('aria-label',btndata.label.text);
      tagRoot.before(tag);
}
