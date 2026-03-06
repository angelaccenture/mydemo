export default function init(el) {
    const getDefault = document.querySelectorAll('.default-content');
    
    getDefault.forEach(function(element) {    
        const defaultChildren = element.childNodes;
         defaultChildren.forEach(function(eachEl) {  
            if (eachEl.textContent.includes('[' && ']')) {
            console.log(eachEl);
            eachEl.style.color = 'red';
            }   
         });
      
        
        //element.classList.add('active'); // Example of adding another class name
    });
}
