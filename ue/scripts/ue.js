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

//Functions to update section filters according to the template/block type
function setUEFilter(element, filter) {
  element.dataset.aueFilter = filter;
}
function setUELabel(element, label) {
  element.dataset.aueLabel = label;
}

function getUniversalEditorSections(sectionType) {
  const main = document.querySelector('main');
  const sectionTypeAll = main.querySelectorAll(sectionType);
  return Array.from(sectionTypeAll); 
}
function updateSectionTemplate() {
  const template = document.querySelector('meta[name="template"]')?.content;
  const sectionList = getUniversalEditorSections('[data-aue-label="Section"]:not(.tabSection)');
  if (template) {
    sectionList.forEach((section) => {
      console.log("section getting template");
      console.log(section);
      setUEFilter(section, `${template}-section`);
    });
  }
}

const advancedBlocks = () => {
  const mutatingBlocks = document.querySelectorAll('div.advanced-tabs, div.advanced-carousel, div.advanced-accordion');
  //Rewrite for all Advanced Blocks after I build them
  console.log("mutatingBlocks");
  console.log(mutatingBlocks);
  //Move advanced blocks up to parent nodes
   mutatingBlocks.forEach((mutation) => {
    const getparentSection = mutation.closest('.tabSection');
    console.log(getparentSection);
    moveInstrumentation(mutation, getparentSection);
   });
   //Update section types for advanced blocks
   const sectionList = getUniversalEditorSections('.tabSection');
   sectionList.slice(1).forEach((section) => {
      setUEFilter(section, `tabs-section`);
      setUELabel(section, `Tab Section`);
    });
};

const setupUEEventHandlers = () => {
  document.addEventListener('aue:content-patch', (event) => {
    console.log(event.detail.patch.name);
  // For each img source change, update the srcsets of the parent picture sources
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
    //Turn layout mode on
    if (event.detail.patch.name == 'layoutmode') {
        console.log("layout mode is active");
        console.log(event);
        const lm = event.detail.patch.value;
        if (lm == true) {
          console.log("turning lm on")
        }

        //Turn it off if the user leaves
    }
  });

};

export default () => {
  setupUEEventHandlers();
  advancedBlocks();
  updateSectionTemplate();
};
