export default function init(el) {
    const getDefault = document.querySelectorAll('.default-content');

    getDefault.forEach(function(element) {  
        console.log(element.children);  
       
    });

    const elementsWithBrackets = Array.from(getDefault).filter(element => {
    const text = element.textContent;
    return text.includes('[') && text.includes(']');
    });

// Log the matching elements
    console.log("what is this?");
    console.log(elementsWithBrackets);

    getDefault.forEach(function(element) {    
       
    });
}
