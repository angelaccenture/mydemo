export default function init(el) {
    console.log("Use advanced Text block");
    const getDefault = document.querySelectorAll('.default-content');
    
    getDefault.forEach(function(element) {    
        const defaultChildren = element.childNodes;
        console.log(defaultChildren);
         defaultChildren.forEach(function(eachEl) {  
            console.log(eachEl);
         });
       if (defaultChildren.textContent.includes('[' && ']')) {
            console.log(element);
            element.style.color = 'red';
        }
        
        //element.classList.add('active'); // Example of adding another class name
    });
}
