export default function init(el) {
    const allHP = document.querySelectorAll('h1, p');

    allHP.forEach(function(element) { 
        const regex = /\[(.*?)\]/;
        const findClass = element.match(regex);
        if (findClass && findClass.length > 1) {
             console.log(findClass);
           }
        /*const elementsWithBrackets = Array.from(allHP).filter(element => {
            const text = element.textContent;
            return text.includes('[') && text.includes(']');

        });
        if (elementsWithBrackets) {
            element.classList.add('center');
        }*/
    }); 
   
   
  
}
