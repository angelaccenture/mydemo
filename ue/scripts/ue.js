import { moveInstrumentation } from './ue-utils.js';

const setupObservers = () => {
  console.log("setupObservers - not needed yet");
};

const setupUEEventHandlers = () => {
  console.log("setupUEEventHandles");
  // For each img source change, update the srcsets of the parent picture sources
  document.addEventListener('aue:content-patch', (event) => {
    console.log("top event listerner");
    if (event.detail.patch.name.match(/img.*\[src\]/)) {
      const newImgSrc = event.detail.patch.value;
      const picture = event.srcElement.querySelector('picture');

      if (picture) {
        picture.querySelectorAll('source').forEach((source) => {
          source.setAttribute('srcset', newImgSrc);
        });
      }
    }
  });

  document.addEventListener('aue:ui-select', (event) => {
     console.log("addEventListerner");
    const { detail } = event;
    const resource = detail?.resource;

    if (resource) {
      const element = document.querySelector(`[data-aue-resource="${resource}"]`);
      if (!element) {
        return;
      }
      const blockEl = element.parentElement?.closest('.block[data-aue-resource]') || element?.closest('.block[data-aue-resource]');
      if (blockEl) {
        const block = blockEl.getAttribute('data-aue-model');
        const index = element.getAttribute('data-slide-index');

        switch (block) {
          case 'accordion':
            blockEl.querySelectorAll('details').forEach((details) => {
              details.open = false;
            });
            element.open = true;
            break;
          case 'carousel':
            if (index) {
              showSlide(blockEl, index);
            }
            break;
          case 'tabs':
            if (element === block) {
              return;
            }
            blockEl.querySelectorAll('[role=tabpanel]').forEach((panel) => {
              panel.setAttribute('aria-hidden', true);
            });
            element.setAttribute('aria-hidden', false);
            blockEl.querySelector('.tabs-list').querySelectorAll('button').forEach((btn) => {
              btn.setAttribute('aria-selected', false);
            });
            blockEl.querySelector(`[aria-controls=${element?.id}]`).setAttribute('aria-selected', true);
            break;
          default:
            break;
        }
      }
    }
  });
};

export default () => {
  setupObservers();
  setupUEEventHandlers();
};
