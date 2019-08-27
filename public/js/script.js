//------------------ AUDIO ---------------------

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const samples = {}; // TODO move vol & pan to state

const sampleData = [
  {kit: '808', name:'kick', path: 'samples/808/kick.wav'},
  {kit: '808', name:'snare', path: 'samples/808/snare.mp3'},
  {kit: '808', name:'hhatc', path: 'samples/808/hhatc.mp3'},
  {kit: '808', name:'hhato', path: 'samples/808/hhato.mp3'},
  {kit: '808', name:'clap', path: 'samples/808/clap.mp3'},
  {kit: '808', name:'maraca', path: 'samples/808/maraca.wav'},

  {kit: 'blackwater', name: 'kick1', path: 'samples/blackwater/kick1.wav'},
  {kit: 'blackwater', name: 'kick2', path: 'samples/blackwater/kick2.wav'},
  {kit: 'blackwater', name: 'kick3', path: 'samples/blackwater/kick3.wav'},
  {kit: 'blackwater', name: 'snare', path: 'samples/blackwater/snare.wav'},
  {kit: 'blackwater', name: 'snare2', path: 'samples/blackwater/snare2.wav'},
  {kit: 'blackwater', name: 'hhatc', path: 'samples/blackwater/hhc.wav'},
  {kit: 'blackwater', name: 'hhato', path: 'samples/blackwater/hho.wav'},
  {kit: 'blackwater', name: 'crash', path: 'samples/blackwater/crash.wav'},
  {kit: 'blackwater', name: 'piano', path: 'samples/blackwater/piano.wav'},

  {kit: 'shadows', name: 'kick', path: 'samples/shadows/kick.wav'},
  {kit: 'shadows', name: 'hhatc', path: 'samples/shadows/hhc.wav'},
  {kit: 'shadows', name: 'snare', path: 'samples/shadows/snare1.wav'},
  {kit: 'shadows', name: 'rim', path: 'samples/shadows/rim.wav'},
  {kit: 'shadows', name: 'clap', path: 'samples/shadows/clap.wav'},
  {kit: 'shadows', name: 'tom', path: 'samples/shadows/tom.wav'},
  {kit: 'shadows', name: 'conga1', path: 'samples/shadows/conga1.wav'},
  {kit: 'shadows', name: 'conga2', path: 'samples/shadows/conga2.wav'},
  {kit: 'shadows', name: 'conga3', path: 'samples/shadows/conga3.wav'},

  { kit: 'pork', name: 'angry', path: 'samples/pork/angry.mp3' },
  { kit: 'pork', name: 'barf', path: 'samples/pork/barf.mp3' },
  { kit: 'pork', name: 'bat', path: 'samples/pork/bat.mp3' },
  { kit: 'pork', name: 'bub', path: 'samples/pork/bub.mp3' },
  { kit: 'pork', name: 'burp', path: 'samples/pork/burp.mp3' },
  { kit: 'pork', name: 'croak', path: 'samples/pork/croak.mp3' },
  { kit: 'pork', name: 'dispair', path: 'samples/pork/dispair.mp3' },
  { kit: 'pork', name: 'flutft', path: 'samples/pork/flutft.mp3' },
  { kit: 'pork', name: 'garglesq', path: 'samples/pork/garglesq.mp3' },
  { kit: 'pork', name: 'grunt', path: 'samples/pork/grunt.mp3' },
  { kit: 'pork', name: 'guff', path: 'samples/pork/guff.mp3' },
  { kit: 'pork', name: 'hen', path: 'samples/pork/hen.mp3' },
  { kit: 'pork', name: 'high', path: 'samples/pork/high.mp3' },
  { kit: 'pork', name: 'highburp', path: 'samples/pork/highburp.mp3' },
  { kit: 'pork', name: 'horror', path: 'samples/pork/horror.mp3' },
  { kit: 'pork', name: 'mediumburp', path: 'samples/pork/mediumburp.mp3' },
  { kit: 'pork', name: 'moan', path: 'samples/pork/moan.mp3' },
  { kit: 'pork', name: 'monkey', path: 'samples/pork/monkey.mp3' },
  { kit: 'pork', name: 'puff', path: 'samples/pork/puff.mp3' },
  { kit: 'pork', name: 'raptor', path: 'samples/pork/raptor.mp3' },
  { kit: 'pork', name: 'reallymad', path: 'samples/pork/reallymad.mp3' },
  { kit: 'pork', name: 'shortchirp', path: 'samples/pork/shortchirp.mp3' },
  { kit: 'pork', name: 'shriek', path: 'samples/pork/shriek.mp3' },
  { kit: 'pork', name: 'surprised', path: 'samples/pork/surprised.mp3' },
  { kit: 'pork', name: 'terror', path: 'samples/pork/terror.mp3' },
  { kit: 'pork', name: 'unhappy', path: 'samples/pork/unhappy.mp3' },
  { kit: 'pork', name: 'vomit', path: 'samples/pork/vomit.mp3' }
];

async function getFile(filepath) {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

async function loadSamples(sampleData){
  for (let i = 0; i < sampleData.length; i++) {
    const sampleObj = sampleData[i];
    const audioBuffer =  await getFile(sampleObj.path);
    samples[i] = {
      ...sampleObj,
      sample: audioBuffer,
      gainNode: audioContext.createGain(),
      pannerNode: audioContext.createStereoPanner(),
      vol: 50,
      pan: 0}
  }
}

function playSample(sampleObj) {
  const gain = sampleObj.vol * 2 / 100;
  const pan = sampleObj.pan / 50;

  const gainNode = sampleObj.gainNode;
  gainNode.gain.value = gain;

  const pannerNode = sampleObj.pannerNode;
  pannerNode.pan.value = pan;

  const audioBuffer = sampleObj.sample;
  const sampleSource = audioContext.createBufferSource();
  sampleSource.buffer = audioBuffer;

  sampleSource.connect(gainNode).connect(pannerNode).connect(audioContext.destination)
  sampleSource.start();
  return sampleSource;
}


// const reverb = new Tone.JCReverb(0.9).connect(Tone.Master);
// const feedbackDelay = new Tone.FeedbackDelay("8n", 0.1).toMaster();
// const chorus = new Tone.Chorus(4, 2.5, 0.5);
const vol = new Tone.Volume(-15).toMaster();
// const synth = new Tone.PolySynth(6, Tone.Synth).chain(vol, chorus, reverb, feedbackDelay);

const synth = new Tone.PolySynth(6, Tone.Synth).chain(vol);


//-----------------  STATE ----------------------

const state = {
  playing: false,
  currentBeat: 0,
  millisecondsPerQuarterNote: 125,
  currentPatternView: 1,
  allowKeyboardShortcuts: true,
  patternOnOffState: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  activeOptionsTabs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // if sequencer or synthesizer is active in each pattern
  selectedSampleDropDown: null,
  pianoData: [
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
  ],
  sequencerData: [
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
  ],
  sequencerSampleData: [
    [0,1,2,3,4,5],
    [6,7,8,9,10,11],
    [12,13,14,3,4,5],
    [15, 16,17,18,19,20],
    [21,22,23,1,2,3],
    [0,1,2,3,4,5],
    [0,1,2,3,4,5],
    [0,1,2,3,4,5],
    [0,1,2,3,4,5],
    [0,1,2,3,4,5],
  ]
}

//-----------------  CONSTANTS ----------------------

const notes = ['B', 'A#', 'A', 'G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C'];


// --------------- SEQUENCER LOOP -------------------


function play(){
  state.playing = true;

  function loop(){
    if (state.playing){
      handleBeatLight();
      playColumn();
      state.currentBeat >= 15 ? state.currentBeat = 0 : state.currentBeat++;
      setTimeout(loop, state.millisecondsPerQuarterNote);
    }
  }

  function playColumn(){
    for (let i = 0; i < state.patternOnOffState.length; i++) {
      if (state.patternOnOffState[i]) {
        playSequencerColumn(i);
        playPianoColumn(state.pianoData[i]);
      }
    }
  }

  function playPianoColumn(pianoPattern){
    const pianoColumn = pianoPattern[state.currentBeat];

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

  function playSequencerColumn(patternId){
    const sequencerPattern    = state.sequencerData[patternId];
    const patternSamples      = state.sequencerSampleData[patternId];
    const sequencerColumn     = sequencerPattern[state.currentBeat];
    setTimeout(()=>{
      for (let row of sequencerColumn) {
        let sampleId = patternSamples[row];
        playSample(samples[sampleId]);
      }
    }, 100)

  }

  function handleBeatLight(){
    const beatLights = document.getElementsByClassName('beatLightGrid')[0].children;
    if (state.currentBeat === 0) {
      beatLights[15].classList.remove('beatLightOn');
    } else {
      beatLights[state.currentBeat - 1].classList.remove('beatLightOn');
    }
    beatLights[state.currentBeat].classList.add('beatLightOn');
  }

  loop();
}

function pause(){
  state.playing = false;
  const beatLights = document.getElementsByClassName('beatLightGrid')[0].children;
  beatLights[state.currentBeat -1].classList.remove('beatLightOn');
  state.currentBeat = 0;
}

async function init(){
  await loadSamples(sampleData);
  let instrumentDiv = document.getElementById('instruments');
  let col1 = document.getElementById('column1');
  let col2 = document.getElementById('column2');
  createSequencer(col1);
  createOptionsPanel(col1);
  createPiano(col2);
  createSamplesMenu(document.body);
  instrumentDiv.appendChild(col1);
  instrumentDiv.appendChild(col2);

  addPatternClickEvents();
  addKeyBoardShortcuts();
}


init();

// ----------------------- PLAY/PAUSE BUTTON ---------------------

let playButton = document.getElementById('playPauseButton')
playButton.addEventListener('click', e => {
  if (state.playing) {
    pause();
    state.playing = false;
    e.target.src = '/images/play.png'
  } else {
    play();
    state.playing = true;
    e.target.src = '/images/stop.png'
  }
})

// ------------------------- BPM INPUT ---------------------------

let BPMinput = document.querySelector('#BPM input');

function changeTempo(BPM){
  let cleanBPM = Number(BPM);
  if (cleanBPM) state.millisecondsPerQuarterNote = 1000 * 60 / BPM / 4;
}

BPMinput.addEventListener('focusin', e => {
  state.allowKeyboardShortcuts = false;
});

BPMinput.addEventListener('focusout', e => {
  state.allowKeyboardShortcuts = true;
  changeTempo(e.target.value)
})

BPMinput.addEventListener('input', e => {
  let inp = Number(e.target.value);
  if (inp >= 0 && inp <= 9999) {
    e.target.classList.remove('invalid');
  } else {
    e.target.classList.add('invalid');
  }
});

BPMinput.addEventListener('keyup', e => {
  if (e.key === "Enter") {
    changeTempo(e.target.value)
  }
})








