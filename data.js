class Instrument {
  constructor(){
    this._data = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    this._active = true;
  }

  get data(){
    return this._data;
  }

  addValue(column, value){
    this._data[column].push(value);
  }

  get active(){
    return this._active;
  }

  toggle(){
    this._active ? this._active = false: this._active = true;
  }
}

class Piano extends Instrument {
  constructor(options = {}){
    super();
    this.volume = 100;
    this.reverb = {}
    this.delay = {}
    this.distortion = {}
    this.chorus = {}
  }
}

class Sequencer extends Instrument {
  constructor(options = {}){
    super();
    this.kit = '808';
    this.sample0 = new Audio('808/kick.wav');
    this.sample1 = new Audio('808/snare.mp3');
    this.sample2 = new Audio('808/hhatc.mp3');
    this.sample3 = new Audio('808/hhato.mp3');
    this.sample4 = new Audio('808/clap.mp3');
    this.sample5 = new Audio('808/maraca.wav');
    this.volumes = [100,100,100,100,100,100];
    this.pans    = [50, 50, 50, 50, 50, 50];
  }
}

let x = new Piano();
console.log(x.eat())