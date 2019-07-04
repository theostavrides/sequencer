//  --------------- SEQUENCER ----------------
function createSequencer(parent, options){
  const sequencerContainer = createSequencerContainer();
  const buttonGrid         = createButtonGrid();
  sequencerContainer.appendChild(buttonGrid);
  addButtons(buttonGrid);
  addSequencerClickEvents(buttonGrid);
  parent.appendChild(sequencerContainer);
}

function createSequencerContainer(){
  let sequencerContainer = document.createElement('div');
  sequencerContainer.classList.add('sequencer', 'align-middle');
  return sequencerContainer;
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
}

createSequencer(document.body);


//---------------- Audio ---------------

let kick = new Audio('808/kick.wav');
let snare = new Audio('808/snare.mp3');
let hhatc = new Audio('808/hhatc.mp3');
let hhato = new Audio('808/hhato.mp3');
let clap = new Audio('808/clap.mp3');
let clave = new Audio('808/clave.wav');

setTimeout(()=>{
  setInterval(()=>{kick.play()}, 1000);
},1000)

setTimeout(()=>{
  setInterval(()=>{snare.play()}, 500);
},1750)

setTimeout(()=>{
  setInterval(()=>{clap.play()}, 1000);
},1750)




