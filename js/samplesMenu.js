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

  function renderSamples(parent) {
    const kitDivs = [];
    const kitNames = [];
    for (let key in samples) {
      const sample = samples[key];
      const kit = sample.kit;
      const name = sample.name;
      const kitId = 'folder' + kit;

      if (!kitNames.includes(kitId)) {
        const sampleDiv = createSampleDiv(name);
        const kitDiv    = createKitDiv(kit);
        kitDiv.lastChild.appendChild(sampleDiv);
        kitDivs.push(kitDiv);
        kitNames.push(kitId);
      } else {
        const kitDiv    = kitDivs[kitNames.indexOf(kitId)];
        const sampleDiv = createSampleDiv(name);
        kitDiv.lastChild.appendChild(sampleDiv);
      }
      for (node of kitDivs) {
        parent.appendChild(node)
      }
    }
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

  function createSampleDiv(name){
    const sampleDiv  = document.createElement('div');
    const sampleName = document.createElement('p');

    sampleName.innerHTML = '&#x25CF ' + name;
    sampleDiv.appendChild(sampleName);
    return sampleDiv;
  }

  //              EVENT LISTENERS
  function addClickListeners(samplesMenu){
    samplesMenu.addEventListener('click', handleClick)
    function handleClick(e){

      //for the close Menu button
      if (e.target.id === 'samplesMenuCloseBox') {
        samplesMenu.classList.remove('show');
      }

      //
      let parent = e.target.parentNode
      let grandParent = parent.parentNode
      if (grandParent.classList.contains('folder')){
        grandParent.classList.toggle('closed');
        console.log(parent.nextSibling)
        parent.nextSibling.classList.toggle('closed');
      }
    }

  }
  initialize();
}





