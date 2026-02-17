export default function init(el) {
  const inner = el.querySelector(':scope > div > div');
  console.log(inner);
  const buttonTag = document.createElement('button');
  buttonTag.textContent = 'New Button'; // Set the button's text content
  buttonTag.type = 'button'; // Set type to button to prevent form submission behavior
  buttonTag.onclick = function() { // Add an event listener
      alert('Button clicked!');
  };
  inner.after(buttonTag);

  /*Add class name, value and aria-label within the button*/

}
