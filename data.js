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

  deleteValue(column, value){
    this._data[column] = this._data[column].filter(e => e !== value);
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
    this.sample0 = 0
    this.sample1 = 1
    this.sample2 = 2
    this.sample3 = 3
    this.sample4 = 4
    this.sample5 = 5
    this.volumes = [100,100,100,100,100,100];
    this.pans    = [50, 50, 50, 50, 50, 50];
  }
}

let piano = new Piano();
piano.addValue(3,24);
piano.addValue(14,2);
piano.deleteValue(3,24);
console.log(piano.data)