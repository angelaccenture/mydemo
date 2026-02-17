const getBtndata = (el) => [...el.childNodes].reduce((rdx, row) => {
  if (row.children) {
    const key = row.children[0].textContent.trim().toLowerCase();
    const content = row.children[1];
    const text = content.textContent.trim().toLowerCase();
    if (key && content) rdx[key] = { content, text };
  }
  return rdx;
}, {});

export default function init(el) {
  const btnRoot = el.querySelector(':scope > div');
    if (!btnRoot) return;
  const btndata = getBtndata(el);
  console.log("btndata");
  console.log(btndata.btntext.text);
  if (btndata.btntext.text) {
    console.log("must have button text & link for anything else");

  } 
  console.log("btndata link");
  console.log(btndata.link);
  //Create Button
  //const buttonTag = document.createElement('a');
  //const buttonText = "test";
  //buttonTag.textContent = buttonText;
  //btnRoot.before(buttonTag);
  //el.remove();
}
