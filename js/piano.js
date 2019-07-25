function createPiano(parent){
  function initialize(){
    const piano         = createPianoDiv();
    const keyboard      = createKeyboardDiv();
    const whiteKeysGrid = createWhiteKeysGrid();
    const blackKeysGrid = createBlackKeysGrid();
    const noteGrid      = createNoteGrid();

    addWhiteKeys(whiteKeysGrid);
    addBlackKeys(blackKeysGrid);
    addNoteButtons(noteGrid);
    addNoteGridClickEvents(noteGrid);

    keyboard.appendChild(whiteKeysGrid);
    keyboard.appendChild(blackKeysGrid);
    piano.appendChild(keyboard);
    piano.appendChild(noteGrid);
    parent.appendChild(piano);
  }

  function createPianoDiv(){
    let piano = document.createElement('div');
    piano.classList.add('piano', 'align-middle');
    return piano;
  }

  function createKeyboardDiv(){
    let keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    return keyboard;
  }

  function createWhiteKeysGrid(){
    let whiteKeysGrid = document.createElement('div');
    whiteKeysGrid.classList.add('whiteKeysGrid');
    return whiteKeysGrid;
  }

  function addWhiteKeys(whiteKeysGrid){
    for (let i = 0; i < 21; i++) {
      let whiteKey = document.createElement('div');
      whiteKey.classList.add('whiteKey')
      whiteKeysGrid.appendChild(whiteKey)
    }
  }

  function createBlackKeysGrid(){
    let blackKeysGrid = document.createElement('div');
    blackKeysGrid.classList.add('blackKeysGrid');
    return blackKeysGrid;
  }

  function addBlackKeys(blackKeysGrid){
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 12; j++) {
        if (j === 1 || j === 3 || j === 5 || j === 8 || j === 10) {
          let blackKey = document.createElement('div')
          blackKey.classList.add('blackKey');
          blackKeysGrid.appendChild(blackKey);
        } else {
          blackKeysGrid.appendChild(document.createElement('div'))
        }

      }
    }

  }

  function createNoteGrid(){
    let noteGrid = document.createElement('div');
    noteGrid.classList.add('noteGrid');
    return noteGrid;
  }

  function addNoteButtons(noteGrid){
    for (let i = 0; i < 36 * 16; i++){
      let noteButton = document.createElement('div');
      noteButton.classList.add('noteButton', 'off');
      noteGrid.appendChild(noteButton);
    }
  }

  function addNoteGridClickEvents(noteGrid){
    noteGrid.addEventListener('click', toggle);

    function toggle(e){
      if (e.target.classList.contains('noteButton')) {
        handleData(e);
        handleVisuals(e);
      }
    }

    function handleData(e){
      let index        = Array.from(e.target.parentNode.children).indexOf(e.target); //get index of clicked button
      let columnNumber = index % 16;
      let rowNumber    = Math.floor(index / 16);
      let dataIndex    = pianoData[currentPatternView][columnNumber].indexOf(rowNumber)
      if (dataIndex === -1){
        pianoData[currentPatternView][columnNumber].push(rowNumber);
      } else {
        pianoData[currentPatternView][columnNumber] = pianoData[currentPatternView][columnNumber].filter(e => e !== rowNumber);
      }
    }

    function handleVisuals(e){
      let classList = e.target.classList;
      if (classList.contains('off')){
        classList.remove('off');
        classList.add('on')
      } else {
        classList.remove('on');
        classList.add('off')
      }
    }
  }


  initialize();
}

function renderPianoData(oldPatternNum, newPatternNum){
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