export default function init(el) {
    const getDefault = document.querySelectorAll('.default-content');
    
    getDefault.forEach(function(element) {    
        const defaultChildren = element.childNodes;
         defaultChildren.forEach(function(eachEl) {  
            const regex = /\[(.*?)\]/;
            const findClass = eachEl.match(regex);
            if (findClass && findClass.length > 1) {
                console.log(findClass[0]);
            }

           /* if (eachEl.textContent.includes('[' && ']')) {

            console.log(eachEl);
            eachEl.style.color = 'red';
            }   */
         });
      
        
        //element.classList.add('active'); // Example of adding another class name
    });
}
