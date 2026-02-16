import { moveInstrumentation } from './ue-utils.js';
import { getMetadata } from '../../scripts/ak.js';

function setUEFilter(element, filter) {
  console.log("dont know what UEFilter is, but lets try it");
  element.dataset.aueFilter = filter;
}
 const template = getMetadata('template');
 console.log(template);
 const footer = document.querySelector('footer');
 console.log(footer);
 footer.remove();

const setupObservers = () => {
 const mutatingBlocks = document.querySelectorAll('div.card, div.carousel, div.accordion');


  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      console.log("Mutation:")
      console.log(mutation);
      if (mutation.type === 'childList' && mutation.target.tagName === 'DIV') {
        console.log("what does this if do?");
        const addedElements = mutation.addedNodes;
        const removedElements = mutation.removedNodes;

      /*  // detect the mutation type of the block or picture (for cards)
        const type = mutation.target.classList.contains('cards-card-image') ? 'cards-image' : mutation.target.attributes['data-aue-model']?.value;
        console.log("type:")
        console.log(type);
        switch (type) {
           case 'footer':
            console.log("footer");
            const removedDivEl = [...mutation.removedNodes].filter((node) => node.tagName === 'DIV');
            break;
           case 'card':
            console.log("card yes");
            // handle card div > li replacements
            if (addedElements.length === 1 && addedElements[0].tagName === 'UL') {
              const ulEl = addedElements[0];
              const removedDivEl = [...mutation.removedNodes].filter((node) => node.tagName === 'DIV');
              removedDivEl.forEach((div, index) => {
                if (index < ulEl.children.length) {
                  moveInstrumentation(div, ulEl.children[index]);
                }
              });
            }
            break;
          case 'cards':
            console.log("cards yes");
            // handle card div > li replacements
            if (addedElements.length === 1 && addedElements[0].tagName === 'UL') {
              const ulEl = addedElements[0];
              const removedDivEl = [...mutation.removedNodes].filter((node) => node.tagName === 'DIV');
              removedDivEl.forEach((div, index) => {
                if (index < ulEl.children.length) {
                  moveInstrumentation(div, ulEl.children[index]);
                }
              });
            }
            break;
          case 'cards-image':
            // handle card-image picture replacements
            if (mutation.target.classList.contains('cards-card-image')) {
              const addedPictureEl = [...mutation.addedNodes].filter((node) => node.tagName === 'PICTURE');
              const removedPictureEl = [...mutation.removedNodes].filter((node) => node.tagName === 'PICTURE');
              if (addedPictureEl.length === 1 && removedPictureEl.length === 1) {
                const oldImgEL = removedPictureEl[0].querySelector('img');
                const newImgEl = addedPictureEl[0].querySelector('img');
                if (oldImgEL && newImgEl) {
                  moveInstrumentation(oldImgEL, newImgEl);
                }
              }
            }
            break;
          case 'accordion':
            if (addedElements.length === 1 && addedElements[0].tagName === 'DETAILS') {
              moveInstrumentation(removedElements[0], addedElements[0]);
              moveInstrumentation(removedElements[0].querySelector('div'), addedElements[0].querySelector('summary'));
            }
            break;
          case 'carousel':
            if (removedElements.length === 1 && removedElements[0].attributes['data-aue-model']?.value === 'carousel-item') {
              const resourceAttr = removedElements[0].getAttribute('data-aue-resource');
              if (resourceAttr) {
                const itemMatch = resourceAttr.match(/item-(\d+)/);
                if (itemMatch && itemMatch[1]) {
                  const slideIndex = parseInt(itemMatch[1], 10);
                  const slides = mutation.target.querySelectorAll('li.carousel-slide');
                  const targetSlide = Array.from(slides).find((slide) => parseInt(slide.getAttribute('data-slide-index'), 10) === slideIndex);
                  if (targetSlide) {
                    moveInstrumentation(removedElements[0], targetSlide);
                  }
                }
              }
            }
            break;
          default:
            break;
        }*/
      }
    });
  });

  mutatingBlocks.forEach((cardsBlock) => {
    observer.observe(cardsBlock, { childList: true, subtree: true });
  });
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
     console.log("addEventListerner console");
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
