export default function init(el) {
    const allHP = document.querySelectorAll('h1, p');

    allHP.forEach(function(element) { 
        const elementsWithBrackets = Array.from(allHP).filter(element => {
        const text = element.textContent;
        return text.includes('[') && text.includes(']');
        });

        console.log("elements")  
        console.log(elementsWithBrackets); 

        const extractedValues = [];
         elementsWithBrackets.map(str => {
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
       
    });
}
