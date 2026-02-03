/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.


import { showSlide } from '../../blocks/carousel/carousel.js';
import { moveInstrumentation } from './ue-utils.js';
console.log("ue.js");

const setupObservers = () => {
  const mutatingBlocks = document.querySelectorAll('div.carousel, div.accordion, footer');
  const observer = new MutationObserver((mutations) => {
    console.log("ue.js - setupObservers");
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.target.tagName === 'DIV') {
        const addedElements = mutation.addedNodes;
        const removedElements = mutation.removedNodes;

       
        switch (type) {
           case 'accordion':
            if (addedElements.length === 1 && addedElements[0].tagName === 'DETAILS') {
              moveInstrumentation(removedElements[0], addedElements[0]);
              moveInstrumentation(removedElements[0].querySelector('div'), addedElements[0].querySelector('summary'));
            }
            break;
          case 'carousel':
             console.log("ue.js - carousel");
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
        }
      }
    });
  });
};

const setupUEEventHandlers = () => {
  // For each img source change, update the srcsets of the parent picture sources
  document.addEventListener('aue:content-patch', (event) => {
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
 */