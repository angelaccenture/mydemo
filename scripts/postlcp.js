import { loadBlock } from './ak.js';

export default async function loadPostLCP() {
  const header = document.querySelector('header');
  if (header) await loadBlock(header);
    const footer = document.querySelector('footer');
    console.log("postlcp");
  if (footer) await loadBlock(footer);
}
