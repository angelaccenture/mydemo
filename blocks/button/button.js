const getBtndata = (el) => [...el.childNodes].reduce((rdx, row) => {
  if (row.children) {
    const key = row.children[0].textContent.trim();
    const content = row.children[1];
    const text = content.textContent.trim();
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
  const btn = document.createElement('a');
  btn.textContent = btndata.btntext.text;
  console.log(btndata.btntext.parentElement);
  btn.href = "http://www.test.com";
 
  btnRoot.before(btn);


  } 

  //el.remove();
}
