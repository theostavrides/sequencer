//------------------ AUDIO ---------------------

let kick = new Audio('808/kick.wav');
let snare = new Audio('808/snare.mp3');
let hhatc = new Audio('808/hhatc.mp3');
let hhato = new Audio('808/hhato.mp3');
let clap = new Audio('808/clap.mp3');
let clave = new Audio('808/clave.wav');

//-----------------  DATA ----------------------

let sequencerData = [
  [1,0,0,1,0,0],
  [0,0,1,1,0,0],
  [1,1,0,0,0,0],
  [0,0,1,1,0,0],
  [1,0,0,0,0,0],
  [0,0,1,0,0,0],
  [1,1,0,0,0,0],
  [0,0,1,0,0,0],
  [1,0,0,0,0,0],
  [0,0,1,0,0,1],
  [1,1,0,0,0,0],
  [0,0,1,1,0,1],
  [1,0,0,0,0,0],
  [0,0,1,0,0,0],
  [1,1,0,0,0,0],
  [0,0,1,0,0,1],
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
    // Handle data
    let index = Array.from(e.target.parentNode.children).indexOf(e.target); //get index of clicked button
    console.log(index)

    // Handle Visuals
    if (e.target.classList.contains('sequencerButton')){
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
  function logCoordinate(e) {
    console.log(e.target)
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
    if (column[0] === 1) kick.play();
    if (column[1] === 1) snare.play();
    if (column[2] === 1) hhatc.play();
    if (column[3] === 1) hhato.play();
    if (column[4] === 1) clap.play();
    if (column[5] === 1) clave.play();
}



document.body.addEventListener('click', ()=>{
  setInterval(loop, 250)
})




