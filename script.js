//------------------ AUDIO ---------------------

let kick = new Audio('808/kick.wav');
let snare = new Audio('808/snare.mp3');
let hhatc = new Audio('808/hhatc.mp3');
let hhato = new Audio('808/hhato.mp3');
let clap = new Audio('808/clap.mp3');
let maraca = new Audio('808/maraca.wav');

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

//  --------------- SEQUENCER ----------------

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

//                    RENDER

function createSequencer(parent, options){
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

createSequencer(document.body);

// -------------- SEQUENCER LOOP ---------------

let currentBeat = 0;

function loop(){
  handleBeatLight(currentBeat);
  playColumn(currentBeat);
  currentBeat >= 15 ? currentBeat = 0 : currentBeat++;
}

function playColumn(currentBeat){
  const column = sequencerData[currentBeat];
  if (column[0] === 1) playSound(kick);
  if (column[1] === 1) playSound(snare);
  if (column[2] === 1) playSound(hhatc);
  if (column[3] === 1) playSound(hhato);
  if (column[4] === 1) playSound(clap);
  if (column[5] === 1) playSound(maraca);

  function playSound(sample){
    sample.pause();
    sample.currentTime = 0;
    sample.play();
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



let button = document.getElementById('start')
button.addEventListener('click', (e)=>{
  setInterval(loop, 250)
  e.target.parentNode.removeChild(e.target);
})




