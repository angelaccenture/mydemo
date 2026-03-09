export default function init(el) {
    const allHP = document.querySelectorAll('h1, p');
    const regex = /\[(.*?)\]/;

    allHP.forEach((element, index) => {
        console.log("Element: " + element);
        const content = element.textContent;
        console.log("content: " + content);
        const matches = content.match(regex);
         console.log("matches: " + matches);
        if (matches) {
            const classname = matches[1];
            element.classList.add(classname);
        }
            // const updatedArray = content.map(item => {
             //   return item.replace(matches[0], "");
            // });
    });

}
