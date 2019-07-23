function createOptionsPanel(parent){
  function initialize(){
    const options    = createOptions();
    const tabs       = createTabs();
    const optionsBox = createOptionsBox();
    const sequencerOptions = createSequencerOptions();
    const synthesizerOptions = createSynthesizerOptions();
    optionsBox.appendChild(sequencerOptions);
    optionsBox.appendChild(synthesizerOptions);
    options.appendChild(tabs);
    options.appendChild(optionsBox);
    parent.appendChild(options);
    addEventListeners();
  }

  function createOptions(){
    let options = document.createElement('div');
    options.classList.add('options');
    return options;
  }

  function createTabs(){
    let tabs  = document.createElement('div');
    let tab1  = document.createElement('div');
    let tab2  = document.createElement('div');
    let text1 = document.createElement('p');
    let text2 = document.createElement('p');
    text1.innerHTML = 'sequencer';
    text2.innerHTML = 'synthesizer';
    tabs.id = 'tabs';
    tab1.id = 'tab1';
    tab2.id = 'tab2';
    tab1.classList.add('tab');
    tab1.classList.add('active');
    tab2.classList.add('tab');
    tab1.appendChild(text1);
    tab2.appendChild(text2);
    tabs.appendChild(tab1);
    tabs.appendChild(tab2);
    return tabs;
  }

  function createOptionsBox(){
    let optionsBox = document.createElement('div');
    optionsBox.id = 'optionsBox';
    return optionsBox;
  }

  //                    SEQUENCER OPTIONS

  function createSequencerOptions(){
    let sequencerOptions = document.createElement('div');
    let grid             = document.createElement('div');
    sequencerOptions.id  = 'sequencerOptions';
    grid.id              = 'sequencerOptionsGrid';
    sequencerOptions.appendChild(grid);

    //add table title
    let tableTitleText = ['', 'sample', 'vol', 'pan']
    for (let i = 0; i < 4; i++) {
      const div = document.createElement('div');
      div.classList.add('tableTitle');
      div.innerHTML = tableTitleText[i];
      grid.appendChild(div);
    }

    //add rows
    for (let i = 0; i < 6; i++) {
      const rowNumber = document.createElement('div');
      rowNumber.classList.add('rowNumber');
      rowNumber.innerHTML = i + 1;

      const sample = document.createElement('div');
      sample.classList.add('sample');
      const sampleDropdown = document.createElement('div');
      sampleDropdown.classList.add('sampleDropdown');
      sampleDropdown.setAttribute('row', i);
      sample.appendChild(sampleDropdown);

      const volume = document.createElement('div');
      volume.classList.add('volume');
      const volbox = document.createElement('div');
      volbox.classList.add('volbox');
      volume.appendChild(volbox);


      const pan = document.createElement('div');
      pan.classList.add('pan');
      const panbox = document.createElement('div');
      panbox.classList.add('panbox');
      pan.appendChild(panbox);

      grid.appendChild(rowNumber);
      grid.appendChild(sample);
      grid.appendChild(volume);
      grid.appendChild(pan);

    }
    return sequencerOptions;
  }

  //                  SYNTHESIZER OPTIONS

  function createSynthesizerOptions(){
    const synthesizerOptions = document.createElement('div');
    synthesizerOptions.id = 'synthesizerOptions';
    synthesizerOptions.classList.add('hide');
    return synthesizerOptions;
  }

  //                 EVENT LISTENERS

  function addEventListeners(){
    addTabClickListener();
    addOptionsGridListener();

    // Sample dropdown menu click events
  }

  function addOptionsGridListener(){
    let grid = document.getElementById('sequencerOptionsGrid');
    grid.addEventListener('click', gridClick)

    function gridClick(e){
      if (e.target.classList.contains('sampleDropdown')){
        sampleClick(e);
      }
    }

    function sampleClick(e){
      let row = e.target.getAttribute('row');
      document.getElementById('samplesMenu').classList.add('show'); //show the samplesMenu
      let allDropdowns = document.getElementsByClassName('sampleDropdown')
      for (let node of allDropdowns) { node.classList.remove('selected') }
      e.target.classList.add('selected') // add selected class to clicked sampleDropdown
      selectedSampleDropDown = { pattern: currentPatternView, row }; //update Data
    }

    function volClick(e){

    }

    function panClick(e){

    }

  }

  function addTabClickListener(){
    const tabs = document.getElementById('tabs');
    const tab1 = document.getElementById('tab1');
    const tab2 = document.getElementById('tab2');
    tabs.addEventListener('click', toggleOptionsView);

    // Options tab click events
    function toggleOptionsView(e){
      let tab = identifyTab(e);
      if (!tab) return;
      const sequencerOptions = document.getElementById('sequencerOptions');
      const synthesizerOptions = document.getElementById('synthesizerOptions');
      if ((tab.id === 'tab1' && sequencerOptions.classList.contains('hide')) ||
          (tab.id === 'tab2' && synthesizerOptions.classList.contains('hide'))){
        toggleClasses();
      }
    }

    function identifyTab(e) {
      if (e.target.classList.contains('tab')){
        return e.target;
      } else if (e.target.parentNode.classList.contains('tab')) {
        return e.target.parentNode;
      } else {
        return null;
      }
    }

    function toggleClasses(){
      tab1.classList.toggle('active');
      tab2.classList.toggle('active');
      sequencerOptions.classList.toggle('hide');
      synthesizerOptions.classList.toggle('hide');
    }
  }

  initialize();
  renderOptionsData(1);
}

function renderOptionsData(newPatternNum){
  let sampleDropdowns = document.getElementsByClassName('sampleDropdown');
  let volBoxes = document.getElementsByClassName('volbox');
  let panBoxes = document.getElementsByClassName('panbox');
  let tabToRender = activeTabState[newPatternNum];
  let samplesToRender = sequencerSampleData[newPatternNum];

  for (let i = 0; i < 6; i++) {
    let sampleId = samplesToRender[i];
    let sample = samples[sampleId];
    let sampleDropdown = sampleDropdowns[i];
    renderSampleName(sampleDropdown, sample.kit, sample.name)
    renderVolume(i, sample.volume);
    renderPan(i, sample.volume);
  }

  function renderSampleName(node, kitname, sampleName) {
    node.innerHTML = kitname + ' - ' + sampleName;
  }

  function renderVolume(index, volumeVal){
    volBoxes[index].innerHTML = volumeVal;
  }

  function renderPan(index, panVal){
    panBoxes[index].innerHTML = panVal;

  }
}

