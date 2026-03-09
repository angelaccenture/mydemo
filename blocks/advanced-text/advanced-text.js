export default function init(el) {
    const allHP = document.querySelectorAll('h1, p');
    const allExtractedValues = [];

    allHP.forEach(function(element) { 
        const content = element.textContent;
        const regex = /\[(.*?)\]/;
        const matches = content.match(regex);

        if (matches) {
            console.log("match value");
            console.log(matches[1]);
            console.log("content to move class name to");
            console.log(element);
            element.classList.add("newclass");
        }
    });

}
