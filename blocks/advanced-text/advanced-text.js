export default function init(el) {
    const allHP = document.querySelectorAll('h1, p');
    const classNames = [];

    allHP.forEach(element => {
        const text = element.textContent || element.innerText; 
        const regex = /\\[(.*?)\\]/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
            classNames.push(match[1]); 
        }
    });

    // Display the results
    console.log(classNames);
   
   
   
  
}
