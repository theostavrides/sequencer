function addPatternClickEvents(){
  const patternsBox = document.getElementById('patterns');
  patternsBox.addEventListener('click', handlePatternClick);
  function handlePatternClick(e){
    const patternBox = e.target.parentNode;
    let index = Array.from(patternBox.parentNode.children).indexOf(patternBox) + 1;
    if (index === 10) index = 0;

    if (e.target.tagName === 'IMG') {
      //switch image
      e.target.src.split('/').pop() === 'greenplay.png' ?
        e.target.src = 'images/stop.png' :
        e.target.src = 'images/greenplay.png';

      //switch pattern box-shaddow color
      let patternBoxClasses = e.target.parentNode.classList;
      patternBoxClasses.contains('playing') ?
        patternBoxClasses.remove('playing') :
        patternBoxClasses.add('playing')


      togglePatternOnOffState(index);
    } else {
      Array.from(patternBox.parentNode.children).forEach(i => i.classList.remove('selected'));
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
      let classes = sequencerButtons.item(column + e * 16).classList;
      classes.remove('on');
      classes.add('off');
    })
    newPattern[column].forEach(e => {
      let classes = sequencerButtons.item(column + e * 16).classList;
      classes.remove('off');
      classes.add('on');
    })
  }
}


function togglePatternOnOffState(patternNum){
  patternOnOffState[patternNum] === 0 ?
    patternOnOffState[patternNum] = 1 :
    patternOnOffState[patternNum] = 0;
}

addPatternClickEvents();