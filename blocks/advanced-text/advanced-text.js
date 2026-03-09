export default function init(el) {
    const allHP = document.querySelectorAll('h1, p');

    const elements = document.querySelectorAll('h1, p');
    const valuesInsideBrackets = [...elements]
    .map(element => element.textContent.matchAll(/\\[(.*?)\\]/g)) 
    .flatMap(matches => [...matches].map(match => match[1])); 

console.log(valuesInsideBrackets); 
   
   
   
  
}
