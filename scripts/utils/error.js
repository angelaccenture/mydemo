import { loadStyle, getConfig } from '../ak.js';
import ENV from './env.js';

const { codeBase } = getConfig();

export default async function error(ex, el) {
  // eslint-disable-next-line no-console
  const daHostName = window.location.hostname.includes('ue.da.live');
  if (daHostName !== true) {
    console.log("this should not show in UE, but should show in normal page")
  }
  else {
    console.log("this should show up in UE")
  }

     if (el && ENV !== 'prod' || daHostName !== true) {
        if (daHostName !== true) {
            console.log("wtf")
        }
      console.log("why is this showing up in UE???");
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
