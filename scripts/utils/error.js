import { loadStyle, getConfig } from '../ak.js';
import ENV from './env.js';

const { codeBase } = getConfig();

export default async function error(ex, el) {
  // eslint-disable-next-line no-console
  const daHostName = window.location.hostname.includes('ue.da.live');
     if ((el && ENV !== 'prod')) {
      if (daHostName !== true) {
        await loadStyle(`${codeBase}/styles/error.css`);
        const wrapper = document.createElement('div');
        wrapper.className = 'has-error';

        const title = document.createElement('p');
        title.className = 'title';
        title.textContent = 'Error';
        el.insertAdjacentElement('afterend', wrapper);
        wrapper.append(title, el);
      }
      }
}
