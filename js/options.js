function createOptionsPanel(parent){
  function initialize(){
    const options    = createOptions();
    const tabs       = createTabs();
    const optionsBox = createOptionsBox();
    const sequencerOptions = createSequencerOptions();
    optionsBox.appendChild(sequencerOptions);
    options.appendChild(tabs);
    options.appendChild(optionsBox);
    parent.appendChild(options);
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
    tab1.classList.add('tab')
    tab2.classList.add('tab')
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

    let initial_samples = ['808 - kick','808 - snare','808 - hhatc','808 - hhato','808 - clap','808 - maraca'];
    //add rows
    for (let i = 0; i < 6; i++) {
      const rowNumber = document.createElement('div');
      rowNumber.classList.add('rowNumber');
      rowNumber.innerHTML = i + 1;

      const sample = document.createElement('div');
      sample.classList.add('sample');
      const sampleDropdown = document.createElement('div');
      sampleDropdown.classList.add('sampleDropdown');
      sampleDropdown.innerHTML = initial_samples[i];
      sample.appendChild(sampleDropdown);

      const volume = document.createElement('div');
      volume.classList.add('volume');
      const volbox = document.createElement('div');
      volbox.classList.add('volbox');
      volbox.innerHTML = 80;
      volume.appendChild(volbox);


      const pan = document.createElement('div');
      pan.classList.add('pan');
      const panbox = document.createElement('div');
      panbox.innerHTML = 80;
      panbox.classList.add('panbox');
      pan.appendChild(panbox);

      grid.appendChild(rowNumber);
      grid.appendChild(sample);
      grid.appendChild(volume);
      grid.appendChild(pan);
    }


    return sequencerOptions;
  }

  initialize();
}