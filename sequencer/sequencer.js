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