//------------------ AUDIO ---------------------

let samples = {
  0: {kit: '808', name:'kick', sample: new Audio('808/kick.wav')},
  1: {kit: '808', name:'snare', sample: new Audio('808/snare.mp3')},
  2: {kit: '808', name:'hhatc', sample: new Audio('808/hhatc.mp3')},
  3: {kit: '808', name:'hhato', sample: new Audio('808/hhato.mp3')},
  4: {kit: '808', name:'clap', sample: new Audio('808/clap.mp3')},
  5: {kit: '808', name:'maraca', sample: new Audio('808/maraca.wav')},

  6: {kit: 'blackwater', name: 'kick1', sample: new Audio('blackwater/kick1.wav')},
  7: {kit: 'blackwater', name: 'kick2', sample: new Audio('blackwater/kick2.wav')},
  8: {kit: 'blackwater', name: 'kick3', sample: new Audio('blackwater/kick3.wav')},
  9: {kit: 'blackwater', name: 'snare', sample: new Audio('blackwater/snare.wav')},
  10: {kit: 'blackwater', name: 'snare2', sample: new Audio('blackwater/snare2.wav')},
  11: {kit: 'blackwater', name: 'hhatc', sample: new Audio('blackwater/hhc.wav')},
  12: {kit: 'blackwater', name: 'hhato', sample: new Audio('blackwater/hho.wav')},
  13: {kit: 'blackwater', name: 'crash', sample: new Audio('blackwater/crash.wav')},
  14: {kit: 'blackwater', name: 'piano', sample: new Audio('blackwater/piano.wav')},

  15: {kit: 'shadows', name: 'kick', sample: new Audio('shadows/kick.wav')},
  16: {kit: 'shadows', name: 'hhatc', sample: new Audio('shadows/hhc.wav')},
  17: {kit: 'shadows', name: 'snare', sample: new Audio('shadows/snare1.wav')},
  18: {kit: 'shadows', name: 'rim', sample: new Audio('shadows/rim.wav')},
  19: {kit: 'shadows', name: 'clap', sample: new Audio('shadows/clap.wav')},
  20: {kit: 'shadows', name: 'tom', sample: new Audio('shadows/tom.wav')},
  21: {kit: 'shadows', name: 'conga1', sample: new Audio('shadows/conga1.wav')},
  22: {kit: 'shadows', name: 'conga2', sample: new Audio('shadows/conga2.wav')},
  23: {kit: 'shadows', name: 'conga3', sample: new Audio('shadows/conga3.wav')},
}

var reverb = new Tone.JCReverb(0.9).connect(Tone.Master);
var feedbackDelay = new Tone.FeedbackDelay("8n", 0.1).toMaster();
var chorus = new Tone.Chorus(4, 2.5, 0.5);
var vol = new Tone.Volume(-15).toMaster();
let synth = new Tone.PolySynth(6, Tone.Synth).chain(vol, chorus, reverb, feedbackDelay);



//-----------------  DATA ----------------------

let currentPatternView = 1; // this is the pattern that the user is currently viewing.

let patternOnOffState = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]; // which patterns are on or off

let sequencerData = [
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
];

let sequencerSampleData = [
  [0,1,2,3,4,5],
  [15, 16,17,18,19,20],
  [21,22,23,1,2,3],
  [0,1,2,3,4,5],
  [0,1,2,3,4,5],
  [0,1,2,3,4,5],
  [0,1,2,3,4,5],
  [0,1,2,3,4,5],
  [0,1,2,3,4,5],
  [0,1,2,3,4,5],
]

let pianoData = [
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
];


let notes = ['B', 'A#', 'A', 'G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C'];


// -------------- SEQUENCER LOOP ---------------

function loop(){
  let currentBeat = 0;
  const offset = 150;  // used with setTimout to sync piano and synth


  function nextTick(){
    handleBeatLight(currentBeat);
    playColumn(currentBeat);
    currentBeat >= 15 ? currentBeat = 0 : currentBeat++;
  }

  function playColumn(currentBeat){
    for (let i = 0; i < patternOnOffState.length; i++) {
      if (patternOnOffState[i]) {
        playSequencerColumn(i, currentBeat);
        playPianoColumn(pianoData[i], currentBeat);
      }
    }
  }

  function playPianoColumn(pianoPattern, currentBeat){
    const pianoColumn = pianoPattern[currentBeat];

    function getNote(gridRowNumber){
      if (gridRowNumber < 12){
        return notes[gridRowNumber] + '5';
      } else if (gridRowNumber < 24) {
        return notes[gridRowNumber - 12] + '4';
      } else {
        return notes[gridRowNumber - 24] + '3';
      }
    }

    for (let e of pianoColumn) {
      synth.triggerAttackRelease(getNote(e), '8n');
    }
  }

  function playSequencerColumn(patternId, currentBeat){
    const sequencerPattern    = sequencerData[patternId];
    const patternSamples      = sequencerSampleData[patternId];
    const sequencerColumn     = sequencerPattern[currentBeat];

    function playSound(sample){
      sample.pause();
      sample.currentTime = 0;
      sample.play();
    }

    setTimeout(()=>{
      for (let row of sequencerColumn) {
        let sampleId = patternSamples[row];
        playSound(samples[sampleId].sample);
      }

    }, offset)
  }

  function handleBeatLight(currentBeat){
    const beatLights = document.getElementsByClassName('beatLightGrid')[0].children;
    setTimeout(()=>{
      if (currentBeat === 0) {
        beatLights[15].classList.remove('beatLightOn');
      } else {
        beatLights[currentBeat - 1].classList.remove('beatLightOn');
      }
      beatLights[currentBeat].classList.add('beatLightOn');
    }, offset)

  }

  setInterval(nextTick, 250);
}

function attachInstruments(){
  let instrumentDiv = document.getElementById('instruments');
  let col1 = document.getElementById('column1');
  let col2 = document.getElementById('column2');
  createSequencer(col1);
  createOptionsPanel(col1);
  createPiano(col2);
  instrumentDiv.appendChild(col1);
  instrumentDiv.appendChild(col2);
}


attachInstruments();

let playButton = document.getElementById('play')
playButton.addEventListener('click', (e)=>{
  loop();

})

