export default function init(el) {
  const btnRoot = el.querySelector(':scope > div');
  console.log(btnRoot);
  const buttonTag = document.createElement('button');
  buttonTag.textContent = 'New Button'; // Get this from DOM
  buttonTag.type = 'button';
  btnRoot.before(buttonTag);

}
