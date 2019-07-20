function addPatternClickEvents(){
  const patternsBox = document.getElementById('patterns');
  patternsBox.addEventListener('click', handlePatternClick);
  function handlePatternClick(e){
    let patternBox;
    e.target.classList.contains('patternBox') ?
      patternBox = e.target :
      patternBox = e.target.parentNode;

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

function addKeyBoardShortcuts(){
  const patternsBox = document.getElementById('patterns');
  console.log(patternsBox);
  document.addEventListener('keydown', logKey);

  function logKey(e){
    let key = parseInt(e.key);
    if (typeof key == 'number' && key < 10 && key >= 0){
      let patterns = document.getElementById('patterns').children;
      Array.from(patterns).forEach(i => i.classList.remove('selected'))
      key === 0 ?
        patterns[9].classList.add('selected') :
        patterns[key - 1].classList.add('selected');
      renderPattern(currentPatternView, key);
      currentPatternView = key;
    }
  }
}

function renderPattern(oldPatternNum, newPatternNum){
  renderSequencer(oldPatternNum, newPatternNum);
  renderPiano(oldPatternNum, newPatternNum);
}

function renderSequencer(oldPatternNum, newPatternNum){
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

function renderPiano(oldPatternNum, newPatternNum){
  let noteButtons = document.getElementsByClassName('noteButton');
  let prevPattern = pianoData[oldPatternNum];
  let newPattern  = pianoData[newPatternNum];
  for (let column = 0; column < 16; column++) {
    prevPattern[column].forEach(e => {
      let classes = noteButtons.item(column + e * 16).classList;
      classes.remove('on');
      classes.add('off');
    })
    newPattern[column].forEach(e => {
      let classes = noteButtons.item(column + e * 16).classList;
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
addKeyBoardShortcuts();