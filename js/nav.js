function addPatternClickEvents(){
  let patternsBox = document.getElementById('patterns');
  patternsBox.addEventListener('click', handlePatternClick);
  function handlePatternClick(e){
    console.log(e.target);
  }
}

addPatternClickEvents();