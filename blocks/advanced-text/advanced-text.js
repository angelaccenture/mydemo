export default function init(el) {
    const allHP = document.querySelectorAll('h1, p');
    const regex = /\[(.*?)\]/;

    allHP.forEach(function(element) { 
        const content = element.textContent;
        const matches = content.match(regex);
        if (matches) {
            const classname = matches[1];
            element.classList.add(classname);
            console.log(matches[0]);
            const newArray = matches.map(function(item) {
                    return item.slice(1); // or item.slice(1)
            });
        }
    });

}
