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
      let dataIndex    = state.sequencerData[state.currentPatternView][columnNumber].indexOf(rowNumber)
      if (dataIndex === -1){
        state.sequencerData[state.currentPatternView][columnNumber].push(rowNumber);
      } else {
        state.sequencerData[state.currentPatternView][columnNumber] = state.sequencerData[state.currentPatternView][columnNumber].filter(e => e !== rowNumber);
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

function renderSequencerData(oldPatternNum, newPatternNum){
  let sequencerButtons = document.getElementsByClassName('sequencerButton');
  let prevPattern = state.sequencerData[oldPatternNum];
  let newPattern  = state.sequencerData[newPatternNum];
  for (let column = 0; column < 16; column++) {
    prevPattern[column].forEach(e => {
      let classes = sequencerButtons.item(column + e * 16).classList;
      classes.remove('on');
      classes.add('off');
    })
    newPattern[column].forEach(e => {
      let classes = sequencerButtons.item(column + e * 16).classList;
      classes.remove('off');
      classes.add('on');
    })
  }
}

