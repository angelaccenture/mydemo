export default function init(el) {
    const allHP = document.querySelectorAll('h1, p');
    const allExtractedValues = [];

    allHP.forEach((element, index) => {
        const content = element.textContent;
        const regex = /\[(.*?)\]/;
        const matches = content.match(regex);
        console.log(element);
        console.log(index);

        if (matches) {
            console.log("matches");
            console.log(matches);
            //const value = element.substring(1, element.length - 1);
            //allExtractedValues.push(value);
            //console.log("Found value:", value);

            // If matches are found, process them to remove the brackets
            /*matches.forEach(match => {
                console.log(match);
                // Remove the leading '[' and trailing ']'
                const value = match.substring(1, match.length - 1);
                allExtractedValues.push(value);
                console.log("Found value:", value);
            });*/
        }
    });

//console.log("All extracted values:", allExtractedValues);
}
