//  --------------- SEQUENCER ----------------
function createSequencer(parent, size){
  let sequencer = document.createElement('div')
  sequencer.classList.add('sequencer', 'align-middle')
  let buttonGrid = document.createElement('div');
  buttonGrid.classList.add('buttonGrid')
  sequencer.appendChild(buttonGrid);

  //Add sequencer buttons
  for (let i = 0; i < 96; i++) {
    let sequencerButton = document.createElement('div');
    sequencerButton.classList.add('sequencerButton', 'off');
    buttonGrid.appendChild(sequencerButton);
  }

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

  parent.appendChild(sequencer);
}

createSequencer(document.body);

