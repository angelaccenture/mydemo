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
 */

import { moveInstrumentation } from './ue-utils.js';

//Remove Footer from UE 
const elementsToRemove = document.querySelectorAll('footer');
elementsToRemove.forEach(element => {
  element.remove();
});

//Update section filters according to the template/block type
function setUEFilter(element, filter) {
  element.dataset.aueFilter = filter;
}
function getUniversalEditorSections() {
  const main = document.querySelector('main');
  //const allSections = main.querySelectorAll('[data-aue-label="Section"]');
  const tabSections = main.querySelectorAll('.tabSection');
  return Array.from(tabSections); 
}
function updateUEInstrumentationTabs() {
  const sectionList = getUniversalEditorSections();
  console.log(sectionList);
  sectionList.forEach((section) => {
      console.log("just tabs now");
      console.log(section);
      setUEFilter(section, `tabs-section`);
    });
}
function updateUEInstrumentationTemplate() {
  const template = document.querySelector('meta[name="template"]')?.content;
  const sectionList = getUniversalEditorSections();
  if (template) {
    sectionList.forEach((section) => {
      console.log("section getting template");
      console.log(section);
      setUEFilter(section, `${template}-section`);
    });
  }
}

const setupObservers = () => {
  console.log("setupObservers");
  const mutatingBlocks = document.querySelectorAll('div.advanced-tabs, div.carousel, div.accordion');
  console.log(mutatingBlocks);
  const observer = new MutationObserver((mutations) => {
    console.log(observer);
    mutations.forEach((mutation) => {
      console.log("mutations");
      console.log(mutation);
     // if (mutation.type === 'childList' && mutation.target.tagName === 'DIV') {
        console.log("If is here");
        const addedElements = mutation.addedNodes;
        const removedElements = mutation.removedNodes;

        switch (type) {
          case 'advanced-tabs':
            console.log("advance tab move goes here");
             const ulEl = addedElements[0];
             console.log(ulEl);
            
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
          case 'accordion':
            if (addedElements.length === 1 && addedElements[0].tagName === 'DETAILS') {
              moveInstrumentation(removedElements[0], addedElements[0]);
              moveInstrumentation(removedElements[0].querySelector('div'), addedElements[0].querySelector('summary'));
            }
            break;
          case 'carousel':
            if (removedElements.length === 1 && removedElements[0].attributes['data-aue-component']?.value === 'carousel-item') {
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
      //}
    });
  });

  mutatingBlocks.forEach((cardsBlock) => {
    observer.observe(cardsBlock, { childList: true, subtree: true });
  });
};


const setupUEEventHandlers = () => {
  // For each img source change, update the srcsets of the parent picture sources
  document.addEventListener('aue:content-patch', (event) => {
    console.log(event.detail.patch.name);

    if (event.detail.patch.name == 'image') {
      console.log("if image yes");
      const newImgSrc = event.detail.patch.value;
      const picture = event.srcElement.querySelector('picture');

      if (picture) {
        picture.querySelectorAll('source').forEach((source) => {
          source.setAttribute('srcset', newImgSrc);
        });
      }
    }
  });

};

export default () => {
  setupUEEventHandlers();
  setupObservers();
  //updateUEInstrumentationTabs();
  //updateUEInstrumentationTemplate();
};
