//------------------ AUDIO ---------------------


let kick = new Audio('808/kick.wav');
let snare = new Audio('808/snare.mp3');
let hhatc = new Audio('808/hhatc.mp3');
let hhato = new Audio('808/hhato.mp3');
let clap = new Audio('808/clap.mp3');
let maraca = new Audio('808/maraca.wav');

var distortion = new Tone.Distortion().toMaster();
let synth = new Tone.PolySynth(6, Tone.Synth).connect(distortion).toMaster();



//-----------------  DATA ----------------------

let sequencerData = [
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0]
]

let pianoData = [
  [],[],[],[],
  [],[],[],[],
  [],[],[],[],
  [],[],[],[]
]


let notes = ['B', 'A#', 'A', 'G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C'];



//  --------------- SEQUENCER ----------------


function createSequencer(parent){
  function initialize(){
    const sequencer     = createSequencerDiv();
    const buttonGrid    = createButtonGrid();
    const beatLightGrid = createBeatLightGrid();
    addButtons(buttonGrid);
    addBeatLights(beatLightGrid);
    addSequencerClickEvents(buttonGrid);
    sequencer.appendChild(buttonGrid);
    sequencer.appendChild(beatLightGrid);
    parent.appendChild(sequencer);
  }
  //                    MAIN

  function createSequencerDiv(){
    let sequencer = document.createElement('div');
    sequencer.classList.add('sequencer', 'align-middle');
    return sequencer;
  }

  //                   BUTTONS

  function createButtonGrid(){
    let buttonGrid = document.createElement('div');
    buttonGrid.classList.add('buttonGrid');
    return buttonGrid;
  }

  function addButtons(buttonGrid){
    for (let i = 0; i < 96; i++) {
      let sequencerButton = document.createElement('div');
      sequencerButton.classList.add('sequencerButton', 'off');
      buttonGrid.appendChild(sequencerButton);
    }
  }

  //                 BEAT LIGHTS

  function createBeatLightGrid(){
    let beatLightGrid = document.createElement('div');
    beatLightGrid.classList.add('beatLightGrid');
    return beatLightGrid;
  }

  function addBeatLights(beatLightGrid){
    for (let i = 0; i < 16; i++) {
      let beatLight = document.createElement('div');
      beatLight.classList.add('beatLight');
      beatLightGrid.appendChild(beatLight);
    }
  }

  //                CLICK EVENTS

  function addSequencerClickEvents(buttonGrid){
    buttonGrid.addEventListener('click', toggle);

    function toggle(e) {
      if (e.target.classList.contains('sequencerButton')) {
        handleData(e);
        handleVisuals(e);
      }
    }

    function handleData(e){
      let index = Array.from(e.target.parentNode.children).indexOf(e.target); //get index of clicked button
      let columnNumber = index % 16;
      let rowNumber    = Math.floor(index / 16);
      if (sequencerData[columnNumber][rowNumber] === 0) {
        sequencerData[columnNumber][rowNumber] = 1;
      } else {
        sequencerData[columnNumber][rowNumber] = 0;
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

// ------------------ PIANO ---------------------
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
      let dataIndex    = pianoData[columnNumber].indexOf(rowNumber)
      if (dataIndex === -1){
        pianoData[columnNumber].push(rowNumber);
      } else {
        pianoData[columnNumber] = pianoData[columnNumber].filter(e => e !== rowNumber);
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
// -------------- SEQUENCER LOOP ---------------

function loop(){
  let currentBeat = 0;

  function nextTick(){
    handleBeatLight(currentBeat);
    playColumn(currentBeat);
    currentBeat >= 15 ? currentBeat = 0 : currentBeat++;
  }

  function playColumn(currentBeat){
    //play sequencer sounds
    const sequencerColumn = sequencerData[currentBeat];
      //offset sounds to sync with synth
    setTimeout(()=>{
      if (sequencerColumn[0] === 1) playSound(kick);
      if (sequencerColumn[1] === 1) playSound(snare);
      if (sequencerColumn[2] === 1) playSound(hhatc);
      if (sequencerColumn[3] === 1) playSound(hhato);
      if (sequencerColumn[4] === 1) playSound(clap);
      if (sequencerColumn[5] === 1) playSound(maraca);
    }, 100)

    //play piano sounds
    const pianoColumn = pianoData[currentBeat];
    for (let e of pianoColumn) {
      synth.triggerAttackRelease(getNote(e), '8n');
    }

    // makes sure sample has stopped before playing
    function playSound(sample){
      sample.pause();
      sample.currentTime = 0;
      sample.play();
    }

    function getNote(gridRowNumber){
      if (gridRowNumber < 12){
        return notes[gridRowNumber] + '5';
      } else if (gridRowNumber < 24) {
        return notes[gridRowNumber - 12] + '4';
      } else {
        return notes[gridRowNumber - 24] + '3';
      }
    }
  }

  function handleBeatLight(currentBeat){
    const beatLights = document.getElementsByClassName('beatLightGrid')[0].children;
    if (currentBeat === 0) {
      beatLights[15].classList.remove('beatLightOn');
    } else {
      beatLights[currentBeat - 1].classList.remove('beatLightOn');
    }
    beatLights[currentBeat].classList.add('beatLightOn');
  }

  setInterval(nextTick, 250);
}

let instrumentDiv = document.getElementById('instruments');
createSequencer(instrumentDiv);
createPiano(instrumentDiv);




let button = document.getElementById('start')
button.addEventListener('click', (e)=>{
  loop();
  e.target.parentNode.removeChild(e.target);
})




