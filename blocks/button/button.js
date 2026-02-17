export default function init(el) {
  const inner = el.querySelector(':scope > div');
  console.log(inner);
  const buttonTag = document.createElement('button');
  const buttonTagAttr = buttonTag.setAttribute("type", "button");
  /*Add class name, value and aria-label within the button*/

}
