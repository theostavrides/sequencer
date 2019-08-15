function createSamplesMenu(parent){
  function initialize(){
    const samplesMenu = createSamplesMenuDiv();
    const title       = createTitle();
    const closeBox  = document.createElement('img');
    closeBox.src = 'images/close.png';
    closeBox.id  = 'samplesMenuCloseBox';
    samplesMenu.appendChild(title);
    samplesMenu.appendChild(closeBox);
    renderSamples(samplesMenu);
    parent.appendChild(samplesMenu);
    addClickListeners(samplesMenu);
  }

  function createSamplesMenuDiv(){
    const div = document.createElement('div');
    div.id = 'samplesMenu';
    return div;
  }

  function createTitle(){
    const title = document.createElement('h1');
    title.innerHTML = 'Samples';
    return title;
  }

  function createKitDiv(kit){
    const kitId     = 'folder' + kit;
    const kitDiv    = document.createElement('div');
    const container = document.createElement('div');
    const arrow     = document.createElement('img');
    const kitName   = document.createElement('h2');
    const samples   = document.createElement('div');

    kitDiv.id = kitId
    kitDiv.classList.add('closed');
    kitDiv.classList.add('folder');
    arrow.src = 'images/blackarrow.png';
    kitName.innerHTML = kit;
    samples.classList.add('closed')
    container.appendChild(arrow);
    container.appendChild(kitName);
    kitDiv.appendChild(container);
    kitDiv.appendChild(samples);
    return kitDiv;
  }

  function createSampleDiv(name, key){
    const sampleDiv  = document.createElement('div');
    const sampleName = document.createElement('p');
    sampleDiv.classList.add('menuSample')
    sampleDiv.setAttribute('sampleId', key);
    sampleName.innerHTML = '&#x25CF ' + name;
    sampleDiv.appendChild(sampleName);
    return sampleDiv;
  }

  function renderSamples(parent) {
    const kitDivs = [];
    const kitNames = [];
    for (let key in samples) {
      const sample = samples[key];
      const kit = sample.kit;
      const name = sample.name;
      const kitId = 'folder' + kit;

      if (!kitNames.includes(kitId)) {
        const sampleDiv = createSampleDiv(name, key);
        const kitDiv    = createKitDiv(kit);
        kitDiv.lastChild.appendChild(sampleDiv);
        kitDivs.push(kitDiv);
        kitNames.push(kitId);
      } else {
        const kitDiv    = kitDivs[kitNames.indexOf(kitId)];
        const sampleDiv = createSampleDiv(name, key);
        kitDiv.lastChild.appendChild(sampleDiv);
      }
      for (node of kitDivs) {
        parent.appendChild(node)
      }
    }
  }

  //              EVENT LISTENERS

  function addClickListeners(samplesMenu){
    samplesMenu.addEventListener('click', handleClick);

    function handleClick(e){
      //for the close Menu button
      if (e.target.id === 'samplesMenuCloseBox') {

        //remove selected class from clicked sample Dropdown
        let allDropdowns = document.getElementsByClassName('sampleDropdown')
        for (let node of allDropdowns) { node.classList.remove('selected') }
        state.selectedSampleDropDown = null;

        return samplesMenu.classList.remove('show');  //close menu
      }

      //toggle the kit samples list
      if (e.target.tagName === 'H2' || e.target.tagName === 'IMG') {
        let parent = e.target.parentNode
        let grandParent = parent.parentNode
        if (grandParent.classList.contains('folder')){
          grandParent.classList.toggle('closed');
          parent.nextSibling.classList.toggle('closed');
        }
        return;
      }

      //if a sample in the menu is clicked
      if (e.target.classList.contains('menuSample') ||
          e.target.parentNode.classList.contains('menuSample')) {
        let sampleid = e.target.getAttribute('sampleid') || e.target.parentNode.getAttribute('sampleid');
        //change state.sequencerSampleData
        state.sequencerSampleData[state.selectedSampleDropDown.pattern][state.selectedSampleDropDown.row] = parseInt(sampleid)
        renderOptions(state.currentPatternView);
      }

    }

  }
  initialize();
}





