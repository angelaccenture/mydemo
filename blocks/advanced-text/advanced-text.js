export default function init(el) {
    console.log("Use advanced Text block");
    const getText = document.querySelectorAll('default-content');
    getText.forEach(function(element) {
         console.log(element);
        element.style.color = 'red';
        element.classList.add('active'); // Example of adding another class name
    });
}
