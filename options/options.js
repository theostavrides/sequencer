function createOptionsPanel(parent){
  function initialize(){
    const options = createOptionsDiv();
    parent.appendChild(options);
  }

  function createOptionsDiv(){
    let options = document.createElement('div');
    options.classList.add('options');
    return options;
  }

  function createTabsDib(){
    let tabsDiv = document.createElement('div')
  }

  initialize();
}