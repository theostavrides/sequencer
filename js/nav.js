function addPatternClickEvents(){
  let patternsBox = document.getElementById('patterns');
  patternsBox.addEventListener('click', handlePatternClick);
  function handlePatternClick(e){
    let patternBox = e.target.parentNode;
    let index = Array.from(patternBox.parentNode.children).indexOf(patternBox) + 1;
    if (index === 10) index = 0;

    if (e.target.tagName === 'IMG') {
      togglePatternOnOffState(index);
    } else {
      currentPatternView = index;
    }

  }
}


function togglePatternOnOffState(patternNum){
  patternOnOffState[patternNum] === 0 ?
    patternOnOffState[patternNum] = 1 :
    patternOnOffState[patternNum] = 0;
}

addPatternClickEvents();