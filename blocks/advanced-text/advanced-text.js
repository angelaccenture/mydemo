export default function init(el) {
    const getDefault = document.querySelectorAll('.default-content');

    getDefault.forEach(function(element) {
        console.log("children")  
        const getDefaultC = element.children;
        console.log(getDefaultC);  


            const elementsWithBrackets = Array.from(getDefaultC).filter(element => {
            const text = element.textContent;
            return text.includes('[') && text.includes(']');
            });
       
    });

    //const elementsWithBrackets = Array.from(getDefault).filter(element => {
    //const text = element.textContent;
    //return text.includes('[') && text.includes(']');
    //});

// Log the matching elements
    console.log("Within Array");
    console.log(elementsWithBrackets);

    getDefault.forEach(function(element) {    
       
    });
}
