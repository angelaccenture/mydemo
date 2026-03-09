export default function init(el) {
    const allHP = document.querySelectorAll('h1, p');

    allHP.forEach(function(element) { 
        const elementsWithBrackets = Array.from(getDefaultC).filter(element => {
        const text = element.textContent;
        return text.includes('[') && text.includes(']');
        });

        console.log("elements")  
        console.log(elementsWithBrackets); 
       
    });
}
