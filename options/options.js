function createOptionsPanel(parent){
  function initialize(){
    const options    = createOptions();
    const tabs       = createTabs();
    const optionsBox = createOptionsBox();
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
    let tabs = document.createElement('div');
    let tab1 = document.createElement('div');
    let tab2 = document.createElement('div');
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

  initialize();
}