export default function init(el) {
  const btnRoot = el.querySelector(':scope > div');
  console.log(btnRoot);

  if (btnRoot) {
    const btnlink = btnRoot.contains('http://' || 'https://');
    console.log(btnlink); 
      console.log(btnRoot.innerHTML);
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
