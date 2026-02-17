async function handleLayout(text, btnRoot, type) {
  if (text === '0') return;
  console.log("create button here and add elements");
  console.log(text);
   
  //Create Button
  //const buttonTag = document.createElement('a');
  //const buttonText = "test";
  //buttonTag.textContent = buttonText;
}

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
  console.log(btndata);
  if (btndata.btntext?.text) handleLayout(btndata.btntext.text, btnRoot, 'btntext');
  console.log("btndata link");
  console.log(btndata.link);
  
  btnRoot.before(buttonTag);
  //el.remove();
}
