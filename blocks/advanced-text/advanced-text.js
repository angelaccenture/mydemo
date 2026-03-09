export default function init(el) {
    const allHP = document.querySelectorAll('h1, p');

    allHP.forEach(function(element) { 
        const matches = allHP.match(/\\[(.*?)\\]/g);
        console.log(matches);
        
               /*const elementsWithBrackets = Array.from(allHP).filter(element => {
            const text = element.textContent;
            return text.includes('[') && text.includes(']');

        });
        if (elementsWithBrackets) {
            element.classList.add('center');
        }*/
    }); 
     const strings = ["[value1]", "item[value2]", "[value3][]"];
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
   
   
  
}
