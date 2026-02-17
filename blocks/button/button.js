export default function init(el) {
  const btnRoot = el.querySelector(':scope > div');
  console.log(el);
  const buttonTag = document.createElement('button');
  const buttonText = "test";
  buttonTag.textContent = buttonText;
  buttonTag.type = 'button';
  
  
  btnRoot.before(buttonTag);


}
