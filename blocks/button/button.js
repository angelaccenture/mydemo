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
  //if (metadata.grid?.text) handleLayout(metadata.grid.text, section, 'grid');
  console.log("btndata link");
  console.log(btndata.link);

  //Create Button
  const buttonTag = document.createElement('button');
  const buttonText = "test";
  buttonTag.textContent = buttonText;
  buttonTag.type = 'button';
  
  
  btnRoot.before(buttonTag);
  

 

  //el.remove();
}
