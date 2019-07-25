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

      //remove selected class from sampleDropdown (if it exists)
      let allDropdowns = document.getElementsByClassName('sampleDropdown')
      for (let node of allDropdowns) { node.classList.remove('selected') }
      selectedSampleDropDown = null;
      //close menu
      document.getElementById('samplesMenu').classList.remove('show');
    }
  }
}

function addKeyBoardShortcuts(){
  const patterns = Array.from(document.getElementById('patterns').children);
  document.addEventListener('keydown', numberEvents);

  function numberEvents(e){
    let key = parseInt(e.key);
    let patternIndex = key === 0 ? 9 : key - 1;
    if (!(typeof key == 'number' && key < 10 && key >= 0)) return;

    if (e.ctrlKey === true) {
      changeSelectedPattern(currentPatternView, key)
      renderPattern(currentPatternView, key);
    } else {
      togglePatternOnOffState(key);
      togglePatternOnOffView(patterns[patternIndex]);
    }
  }
}

function togglePatternOnOffView(node){
  let image = node.children[1];
  image.src.split('/').pop() === 'greenplay.png' ?
    image.src = 'images/stop.png' :
    image.src = 'images/greenplay.png';

  //switch pattern box-shaddow color
  let patternBoxClasses = node.classList;
  patternBoxClasses.contains('playing') ?
    patternBoxClasses.remove('playing') :
    patternBoxClasses.add('playing')
}

function changeSelectedPattern(oldPatternNum, newPatternNum) {
  let patterns = document.getElementById('patterns').children;
  Array.from(patterns).forEach(i => i.classList.remove('selected'))
  newPatternNum === 0 ?
    patterns[9].classList.add('selected') :
    patterns[newPatternNum - 1].classList.add('selected');

}

function renderPattern(oldPatternNum, newPatternNum){
  renderSequencerData(oldPatternNum, newPatternNum);
  renderPianoData(oldPatternNum, newPatternNum);
  renderOptions(newPatternNum);
  currentPatternView = newPatternNum;
}


function togglePatternOnOffState(patternNum){
  patternOnOffState[patternNum] === 0 ?
    patternOnOffState[patternNum] = 1 :
    patternOnOffState[patternNum] = 0;
}

