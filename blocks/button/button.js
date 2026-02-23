const getBtndata = (el) => [...el.childNodes].reduce((rdx, row) => {
  if (row.children) {
    const key = row.children[0].textContent.trim().toLowerCase();
    console.log("key");
    console.log(key);
    //const text = key.textContent.trim();
    //console.log(text);
    //if (key && content) rdx[key] = { content, text };
  }
  return rdx;
}, {});

export default function init(el) {
  const btnRoot = el.querySelector(':scope > div');
  console.log(btnRoot);
  const getdata = btnRoot.closest('http://' || 'https://');
  console.log(getdata);
  if (btndata.text) {
     // console.log(btndata.text);
      const btn = document.createElement('a');
      btn.textContent = btndata.text.text;
     // console.log(btndata.text.parentElement);
      btn.href = btndata.link.text;
      btn.setAttribute('aria-label',btndata.text);
      btnRoot.before(btn);
  }
  else {
    console.log("Button must have a standard link");
  } 
 const btnAll = el.querySelectorAll(':scope > div');
 btnAll.forEach(btnelement => {
  //btnelement.remove();
});
}
