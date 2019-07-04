//  --------------- SEQUENCER ----------------
function createSequencer(parent){
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

createSequencer(document.body)
