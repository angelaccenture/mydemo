export default function init(el) {
    const allHP = document.querySelectorAll('h1, p');
    const allExtractedValues = [];

    allHP.forEach(function(element) { 
        const content = element.textContent;
        const regex = /\[(.*?)\]/;
        const matches = content.match(regex);

        if (matches) {
            const classname = matches[1];
            element.classList.add(classname);

            
            const newArray = matches.map(item => {
                return item.replace(regex, '');
            });
        }
    });

}
