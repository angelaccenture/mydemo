export default function init(el) {
    console.log("Use advanced Text block");
    const getDefault = document.querySelectorAll('.default-content');
    getDefault.forEach(function(element) {
       if (element.textContent.includes('[' && ']')) {
            console.log(element);
            element.style.color = 'red';
        }
        

   
        element.classList.add('active'); // Example of adding another class name
    });
}
