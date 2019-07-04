//------------------ AUDIO ---------------------

let kick = new Audio('808/kick.wav');
let snare = new Audio('808/snare.mp3');
let hhatc = new Audio('808/hhatc.mp3');
let hhato = new Audio('808/hhato.mp3');
let clap = new Audio('808/clap.mp3');
let clave = new Audio('808/clave.wav');

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
function createSequencer(parent, options){
  const sequencer  = createSequencerDiv();
  const buttonGrid = createButtonGrid();
  sequencer.appendChild(buttonGrid);
  addButtons(buttonGrid);
  addSequencerClickEvents(buttonGrid);
  parent.appendChild(sequencer);
}

function createSequencerDiv(){
  let sequencer = document.createElement('div');
  sequencer.classList.add('sequencer', 'align-middle');
  return sequencer;
}

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

createSequencer(document.body);

// -------------- SEQUENCER LOOP ---------------

let currentBeat = 0;

function loop(){
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
  if (column[5] === 1) playSound(clave);

  function playSound(sample){
    sample.pause();
    sample.currentTime = 0;
    sample.play();
  }
}



let button = document.getElementById('start')
button.addEventListener('click', ()=>{
  setInterval(loop, 250)
})




