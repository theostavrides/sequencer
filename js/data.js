// idea for data structure;
class Instrument {
  constructor(){
    this._data = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    this._active = true;
  }

  get data(){
    return this._data;
  }

  set data(data){
    this._data = data;
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
    this._volume = 100;
    this._reverb = {}
    this._delay = {}
    this._distortion = {}
    this._chorus = {}
  }
}

class Sequencer extends Instrument {
  constructor(options = {}){
    super();
    this._kit = '808';
    this._samples = ['808clap.wav', '808kick.mp3', '808hhc.mp3', '808hho.mp3', '808clap.mp3', '808shaker.wav'];
    this._volumes = [100, 100, 100, 100, 100, 100];
    this._pans    = [50, 50, 50, 50, 50, 50];
  }

}

let piano = new Piano();
piano.addValue(3,24);
piano.addValue(14,2);
piano.deleteValue(3,24);
console.log(piano.data)