function addPatternClickEvents(){
  const patternsBox = document.getElementById('patterns');
  patternsBox.addEventListener('click', handlePatternClick);
  function handlePatternClick(e){
    const patternBox = e.target.parentNode;
    let index = Array.from(patternBox.parentNode.children).indexOf(patternBox) + 1;
    if (index === 10) index = 0;

    if (e.target.tagName === 'IMG') {
      togglePatternOnOffState(index);
    } else {
      console.log(patternBox.parentNode.children)
      for (let i = 0; i < 10; i++) { patternBox.parentNode.children.item(i).classList.remove('selected') }
      patternBox.classList.add('selected');

      const oldPatternView = currentPatternView;
      currentPatternView = index;
      renderPattern(oldPatternView, currentPatternView);
    }
  }
}

function renderPattern(oldPatternNum, newPatternNum){
  let newData = sequencerData[newPatternNum];
  let sequencerButtons = document.getElementsByClassName('sequencerButton');
  let prevPattern = sequencerData[oldPatternNum];
  let newPattern  = sequencerData[newPatternNum];
  for (let column = 0; column < 16; column++) {
    prevPattern[column].forEach(e => {
      sequencerButtons.item((column) + (e * 16)).classList.remove('on')
      sequencerButtons.item((column) + (e * 16)).classList.add('off')
    })
    newPattern[column].forEach(e => {
      sequencerButtons.item((column) + (e * 16)).classList.remove('off')
      sequencerButtons.item((column) + (e * 16)).classList.add('on')
    })
  }
}


function togglePatternOnOffState(patternNum){
  patternOnOffState[patternNum] === 0 ?
    patternOnOffState[patternNum] = 1 :
    patternOnOffState[patternNum] = 0;
}

addPatternClickEvents();