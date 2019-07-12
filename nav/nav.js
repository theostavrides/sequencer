let button = document.getElementById('start')
button.addEventListener('click', (e)=>{
  loop();
  e.target.parentNode.removeChild(e.target);
})