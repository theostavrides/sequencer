//------------------ AUDIO ---------------------

//808


let s0 = new Audio('808/kick.wav');
let s1 = new Audio('808/snare.mp3');
let s2 = new Audio('808/hhatc.mp3');
let s3 = new Audio('808/hhato.mp3');
let s4 = new Audio('808/clap.mp3');
let s5 = new Audio('808/maraca.wav');

let samples = [s0,s1,s2,s3,s4,s5];

var reverb = new Tone.JCReverb(0.7).connect(Tone.Master);
var feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toMaster();
var vol = new Tone.Volume(-15).toMaster();
let synth = new Tone.PolySynth(6, Tone.Synth).chain(vol, reverb, feedbackDelay);



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
  [0,1,2,3,4,5],
  [0,1,2,3,4,5],
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
        playSound(samples[sampleId]);
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

