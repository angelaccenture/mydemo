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

function loadCSS(filename) {
  var head = document.head; // Access document head
  var link = document.createElement('link'); // Create a new link element
  link.rel = 'stylesheet'; // Set the rel attribute
  link.type = 'text/css'; // Set the type attribute
  link.href = filename; // Set the href (path to the CSS file)

  head.appendChild(link); // Append the link to the head
}
loadCSS( './ue/scripts/ue-styles.css');

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
      setUEFilter(section, `${template}-section`);
    });
  }
}
const advancedBlocks = () => {
  const mutatingBlocks = document.querySelectorAll('div.advanced-tabs, div.advanced-carousel, div.advanced-accordion');
  //Rewrite for all Advanced Blocks after I build them
  //console.log("mutatingBlocks");
  //console.log(mutatingBlocks);
  //Move advanced blocks up to parent nodes
   mutatingBlocks.forEach((mutation) => {
    const getparentSection = mutation.closest('.tabSection');
    moveInstrumentation(mutation, getparentSection);
   });
   //Update section types for advanced blocks
   const sectionList = getUniversalEditorSections('.tabSection');
   sectionList.slice(1).forEach((section) => {
      setUEFilter(section, `tabs-section`);
      setUELabel(section, `Tab Section`);
    });
};
const defaultContent = () => {
  const fixDefault = document.querySelectorAll('.default-content');
   fixDefault.forEach((defaultC) => {
    defaultC.classList.add(`block-content`);
    const newEle = document.createElement('div');
    newEle.setAttribute('class','image');
    newEle.setAttribute('data-aue-behavior','component');
    const getUEattrres = defaultC.children[0].getAttribute('data-aue-resource');
    console.log(getUEattrres);
     if (getUEattrres !== null) {
      newEle.setAttribute('data-aue-resource', getUEattrres)
    }
    const getUEattrlab = defaultC.children[0].getAttribute('data-aue-label');
    console.log(getUEattrlab);
     if (getUEattrlab !== null) {
      newEle.setAttribute('data-aue-label', getUEattrlab)
    }
    const getUEattrcomp = defaultC.children[0].getAttribute('data-aue-component');
    console.log(getUEattrcomp);
     if (getUEattrcomp !== null) {
      newEle.setAttribute('data-aue-component', getUEattrcomp)
    }


    defaultC.appendChild(newEle);

    const defaultParent = defaultC.parentElement;
    console.log("Parents: ");
    console.log(defaultParent)
    
    //create outer layer, then move picture into outer layer
   });
  const fixTextBlock = document.querySelectorAll('div.richtext');
   fixTextBlock.forEach((textBlock) => {
    const getparentBlock = textBlock.parentElement.parentElement;
    const getBlock = textBlock.closest('.block-content');
    /*console.log("Parents: ");
    console.log(getparentBlock)
    console.log("Block Content: ");
    console.log(getBlock);*/
   });
};

const setupUEEventHandlers = () => {
  document.addEventListener('aue:content-patch', (event) => {
  // For each img source change, update the srcsets of the parent picture sources
    if (event.detail.patch.name == 'image') {
      const newImgSrc = event.detail.patch.value;
      const picture = event.srcElement.querySelector('picture');

      if (picture) {
        picture.querySelectorAll('source').forEach((source) => {
          source.setAttribute('srcset', newImgSrc);
        });
      }
    }
     //Layout Mode - NTH: show dummy block sections where none and turn it off if the user leaves section area
    if (event.detail.patch.name == 'layoutmode') {
      if (event.detail.patch.value == true) {
        const getsection = event.srcElement.querySelector('div').parentNode;
        const findGrid = getsection.classList;       
          findGrid.forEach(grid => {
            if (grid.includes('grid-')) {
              console.log("yes has grid class I am looking for");
              console.log(grid);
            }
          });
      }
    }
    
  });
  document.addEventListener('aue:ui-viewport-change', (viewevent) => {
    // console.log("ui-viewport-change");
    // console.log(viewevent);
  });
  document.addEventListener('aue:ui-edit', (editevent) => {
     //console.log("ui-edit");
     //console.log(editevent);
  });
  document.addEventListener('aue:ui-select', (selectevent) => {
     const layoutModeOn = document.getElementsByClassName('layoutmode');
     if (layoutModeOn.length > 0) {
      console.log("turn layoutmode off once user leaves section - need to remove from DA DOM");
     }
  });
};

export default () => {
  setupUEEventHandlers();
  advancedBlocks();
  defaultContent();
  updateSectionTemplate();
};
