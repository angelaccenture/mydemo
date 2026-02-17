export default function init(el) {
  const inner = el.querySelector(':scope > div > div');
  console.log(inner);
  const buttonTag = document.createElement('button');
  const buttonTagAttr = buttonTag.setAttribute("type", "button");
  inner.append(buttonTagAttr);

  /*Add class name, value and aria-label within the button*/

}
