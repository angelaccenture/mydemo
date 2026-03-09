export default function init(el) {
    const allHP = document.querySelectorAll('h1, p');
    const regex = /\[(.*?)\]/;

    allHP.forEach((element, index) => {
        const content = element.textContent;
        const matches = content.match(regex);
        
        if (matches) {
            const classname = matches[1];
            element.classList.add(classname);
            console.log("content: " + content);
            console.log("matches: " + matches);
        }
            // const updatedArray = content.map(item => {
             //   return item.replace(matches[0], "");
            // });
    });

}
