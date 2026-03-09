export default function init(el) {
    const allHP = document.querySelectorAll('h1, p');
    const regex = /\[(.*?)\]/;

    allHP.forEach((element, index, array) => {
        const content = element.textContent;
        const matches = content.match(regex);
        
        if (matches) {
            const classname = matches[1];
            element.classList.add(classname);
            console.log("content: " + content);
            console.log("matches: " + matches);
            const partToRemove = "center";
            const updatedElement = content.replace(partToRemove, '');
            console.log(updatedElement);
            //array[index] = updatedElement;
            return updatedElement;
        }
    });

}
