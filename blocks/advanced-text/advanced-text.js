export default function init(el) {
    const getDefault = document.querySelectorAll('.default-content');
    
    getDefault.forEach(function(element) {    
        const str = element.childNodes;
              const regex = /\\[(.*?)\\]/g; // Matches content including the brackets

const matches = str.match(regex); // ["value1]", "[value2]", "[value3]"]

// To get the values without brackets, map over the matches
const valuesWithoutBrackets = matches.map(match => match.replace(/\\[|\\]/g, ''));

console.log(valuesWithoutBrackets);

         defaultChildren.forEach(function(eachEl) {  
           // const regex = /\[(.*?)\]/;
           // const findClass = eachEl.match(regex);
           // if (findClass && findClass.length > 1) {
            //    console.log(findClass[0]);
           // }

           /* if (eachEl.textContent.includes('[' && ']')) {

            console.log(eachEl);
            eachEl.style.color = 'red';
            }   */
         });
      
        
        //element.classList.add('active'); // Example of adding another class name
    });
}
