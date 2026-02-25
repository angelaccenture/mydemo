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

// updated section filters according to the template
function setUEFilter(element, filter) {
  element.dataset.aueFilter = filter;
}
function getUniversalEditorSections() {
  const main = document.querySelector('main');
  const sections = main.querySelectorAll('[data-aue-label="Section"]');
  return Array.from(sections); 
}
function updateUEInstrumentation() {
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
//Remove Footer from UE - rewrite later with aue:content-remove
const elementsToRemove = document.querySelectorAll('footer');
elementsToRemove.forEach(element => {
  element.remove();
});


const setupUEEventHandlers = () => {
  // For each img source change, update the srcsets of the parent picture sources
  document.addEventListener('aue:content-patch', (event) => {
    console.log(event.detail.patch.name);

    if (event.detail.patch.name == 'image') {
      console.log("if image yes");
      //const newImgSrc = event.detail.patch.value;
      //const picture = event.srcElement.querySelector('picture');

      /*if (picture) {
        picture.querySelectorAll('source').forEach((source) => {
          source.setAttribute('srcset', newImgSrc);
        });
      }*/
    }
  });

 /* 
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
        const block = blockEl.getAttribute('data-aue-component');
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
  */
};

export default () => {
  setupUEEventHandlers();
  updateUEInstrumentation();
};
