//------------------ AUDIO ---------------------

//808
let kick = new Audio('808/kick.wav');
let snare = new Audio('808/snare.mp3');
let hhatc = new Audio('808/hhatc.mp3');
let hhato = new Audio('808/hhato.mp3');
let clap = new Audio('808/clap.mp3');
let maraca = new Audio('808/maraca.wav');


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
    // checks to see which patterns are turned on, and plays their columns
    for (let i = 0; i < patternOnOffState.length; i++) {
      if (patternOnOffState[i]) {
        playSequencerColumn(sequencerData[i], currentBeat);
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

  function playSequencerColumn(sequencerPattern, currentBeat){
    const sequencerColumn = sequencerPattern[currentBeat];

    function playSound(sample){
      sample.pause();
      sample.currentTime = 0;
      sample.play();
    }

    setTimeout(()=>{
      for (sample of sequencerColumn) {
        if (sample === 0) playSound(kick);
        if (sample === 1) playSound(snare);
        if (sample === 2) playSound(hhatc);
        if (sample === 3) playSound(hhato);
        if (sample === 4) playSound(clap);
        if (sample === 5) playSound(maraca);
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

