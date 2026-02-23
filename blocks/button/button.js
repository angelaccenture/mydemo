const getBtndata = (el) => [...el.childNodes].reduce((rdx, row) => {
  if (row.children) {
    const key = row.children[0].textContent.trim().toLowerCase();
    const content = row.children[1];
    const text = content.textContent.trim();
    if (key && content) rdx[key] = { content, text };
  }
  return rdx;
}, {});

export default function init(el) {
  const btnRoot = el.querySelector(':scope > div');
    if (!btnRoot) return;
 // const btndata = getBtndata(el);
  console.log(btndata);
  if (btndata.text) {
      console.log(btndata.text);
      const btn = document.createElement('a');
      btn.textContent = btndata.text.text;
      console.log(btndata.text.parentElement);
      btn.href = btndata.link.text;
      btn.setAttribute('aria-label',btndata.text);
      btnRoot.before(btn);
  } 
  const btnAll = el.querySelectorAll(':scope > div');
 btnAll.forEach(btnelement => {
  btnelement.remove();
});
}
