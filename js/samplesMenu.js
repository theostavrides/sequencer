function createSamplesMenu(parent){
  function initialize(){
    const samplesMenu = createSamplesMenuDiv();
    const title       = createTitle();
    samplesMenu.appendChild(title);
    renderSamples(samplesMenu);
    parent.appendChild(samplesMenu);
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
      console.log(kitNames)

    }
  }

  function createKitDiv(kit){
    const kitId     = 'folder' + kit;
    const kitDiv    = document.createElement('div');
    const arrowDown = document.createElement('img');
    const arrowSide = document.createElement('img');
    const icon      = document.createElement('img');
    const kitName   = document.createElement('h2');
    const samples   = document.createElement('div');

    kitDiv.id = kitId
    kitDiv.classList.add('closed');
    kitName.innerHTML = kit;

    kitDiv.appendChild(arrowDown);
    kitDiv.appendChild(arrowSide);
    kitDiv.appendChild(icon);
    kitDiv.appendChild(kitName);
    kitDiv.appendChild(samples);

    return kitDiv;
  }

  function createSampleDiv(name){
    const sampleDiv  = document.createElement('div');
    const icon       = document.createElement('img');
    const sampleName = document.createElement('p');
    sampleName.innerHTML = name;
    sampleDiv.appendChild(icon);
    sampleDiv.appendChild(sampleName);
    return sampleDiv;
  }

  initialize();
}





