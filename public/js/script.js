//--------------------  STATE ----------------------

const state = {
  playing: false,
  currentBeat: 0,
  millisecondsPerQuarterNote: 125,
  currentPatternView: 1,
  allowKeyboardShortcuts: true,
  patternOnOffState: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  activeOptionsTabs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // if sequencer or synthesizer is active in each pattern
  selectedSampleDropDown: null,
  samplesData: null,
  samples: {},
  initialKitsToLoad: ['808', 'blackwater', 'shadows'],
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
    [5,4,3,2,1,0],
    [5,4,3,2,1,0],
    [5,4,3,2,1,0],
    [5,4,3,2,1,0],
    [5,4,3,2,1,0],
    [5,4,3,2,1,0],
    [5,4,3,2,1,0],
    [5,4,3,2,1,0],
    [5,4,3,2,1,0],
    [5,4,3,2,1,0],
  ]
}

//------------------ AUDIO ---------------------

const audioContext = new (window.AudioContext || window.webkitAudioContext)();


function createSampleObjects(samplesMetaData) {
  /*
    SamplesMetaData is fetched from the server and contains information about all the available samples
    in /public/samples.  The data is used to build the data structure of state.samples.
  */
  samplesMetaData.forEach(sampleMetaData => {
    state.samples[Object.keys(state.samples).length] = {
      ...sampleMetaData,
      sample: null,
      gainNode: audioContext.createGain(),
      pannerNode: audioContext.createStereoPanner(),
      vol: 50,
      pan: 0
    };
  });
}

async function loadInitialSamples(samplesData){
  /*
    After state.samples is built, this function loads the audio buffers for each sample
    in state.initialKits.  The remaining audio buffers are lazy loaded when required by
    the user (I.E. When a sample is clicked in the sample menu).
  */
  for (let key in samplesData) {
    let sampleObj = samplesData[key];
    if (state.initialKitsToLoad.includes(sampleObj.kit)) {
      await loadSampleAudioBuffer(sampleObj);
    }
  }
}

async function loadSampleAudioBuffer(sampleObj) {
  const response = await fetch(sampleObj.path);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  sampleObj.sample = audioBuffer;
}


//-------------------- TONEJS -----------------------
const vol = new Tone.Volume(-15).toMaster();
const synth = new Tone.PolySynth(6, Tone.Synth).chain(vol);



// const reverb = new Tone.JCReverb(0.9).connect(Tone.Master);
// const feedbackDelay = new Tone.FeedbackDelay("8n", 0.1).toMaster();
// const chorus = new Tone.Chorus(4, 2.5, 0.5);
// const synth = new Tone.PolySynth(6, Tone.Synth).chain(vol, chorus, reverb, feedbackDelay);



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
        playSample(state.samples[sampleId]);
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

function stop(){
  state.playing = false;
  const beatLights = document.getElementsByClassName('beatLightGrid')[0].children;
  beatLights[state.currentBeat -1].classList.remove('beatLightOn');
  state.currentBeat = 0;
}

async function init(){
  state.samplesData = await fetch('/samplesmetadata').then(res => res.json());
  await createSampleObjects(state.samplesData);
  await loadInitialSamples(state.samples);
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

// ----------------------- PLAY/STOP --------------------------

//button
let playStopButton = document.getElementById('playStopButton');

playStopButton.addEventListener('click', e => {
  if (state.playing) {
    stop();
    e.target.src = '/images/play.png';
  } else {
    play();
    e.target.src = '/images/stop2.png';
  }
})

//spacebar
document.addEventListener('keyup', e => {
  if (e.keyCode == 32){
    if (state.playing){
      stop();
      playStopButton.src = '/images/play.png';
    } else {
      play();
      playStopButton.src = '/images/stop2.png';
    }
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



