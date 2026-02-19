import { getMetadata } from '../scripts/ak.js';

export default function init(el) {
    console.log("show tags on page");
  const tagMeta = getMetadata('article:tag');
  console.log(tagMeta);

}
