export default function init(el) {
    const allHP = document.querySelectorAll('h1, p');
    const allExtractedValues = [];

    allHP.forEach(function(element) { 
       // Get the plain text content of the element
    const content = element.textContent;

    // 3. Use regex to find all matches in the content
    // The regex /\[(.*?)]/g finds the brackets and their content
    const matches = content.match(/\\[(.*?)\\]/g);

    if (matches) {
        // If matches are found, process them to remove the brackets
        matches.forEach(match => {
            // Remove the leading '[' and trailing ']'
            const value = match.substring(1, match.length - 1);
            allExtractedValues.push(value);
            console.log("Found value:", value);
        });
    }
});

console.log("All extracted values:", allExtractedValues);
}
