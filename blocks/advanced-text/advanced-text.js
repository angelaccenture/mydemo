export default function init(el) {
    const allHP = document.querySelectorAll('h1, p');

    allHP.forEach(function(element) { 
        
        const strings = ["[value1]", "item[value2]", "[value3][]"];
        console.log("strings");
        console.log(strings);
        const extractedValues = [];
     
     
        strings.map(str => {
            const matches = str.match(/\\[(.*?)\\]/g); // Find all matches including brackets
            if (matches) {
                matches.forEach(match => {
                // Remove the brackets to get the value
                const value = match.replace('[', '').replace(']', '');
                extractedValues.push(value);
                });
            }
            });
            console.log("extractedValues");
            console.log(extractedValues);
        /*const elementsWithBrackets = Array.from(allHP).filter(element => {
            const text = element.textContent;
            return text.includes('[') && text.includes(']');

        });
        if (elementsWithBrackets) {
            element.classList.add('center');
        }*/
    }); 
   
   
  
}
