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
  console.log(btndata);
  //if (btndata.text?.text) handleLayout(metadata.text.text, section, 'text');
  console.log(btndata.link);
  const buttonTag = document.createElement('button');
  const buttonText = "test";
  buttonTag.textContent = buttonText;
  buttonTag.type = 'button';
  
  
  btnRoot.before(buttonTag);

  const section = el.closest('.section');
  

 

  //el.remove();
}
