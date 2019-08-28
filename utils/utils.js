const fs = require('fs');
const samplesDirectory = './public/samples/';

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

function buildSampleObj(kit, file) {
  let sampleObj = {};
  sampleObj.kit = kit;
  sampleObj.name = file.substring(0, file.length - 4);
  sampleObj.path = 'samples/' + kit + '/' + file;
  return sampleObj
}

function getKitDirectories(){
  return new Promise((resolve, reject) => {
    fs.readdir(samplesDirectory, (err, paths) => {
      if (err) {
        reject(err);
      } else {
        resolve(paths.filter(path => fs.statSync(samplesDirectory + path).isDirectory()))
      }
    });
  });
}

function buildSampleObjects(kit){
  return new Promise((resolve, reject) => {
    fs.readdir(samplesDirectory + '/' + kit, (err, files) => {
      if (err) {
        reject(err)
      } else {
        let musicFiles = files.filter(file => file.endsWith('.wav') || file.endsWith('.mp3'))
        let sampleObjs = musicFiles.map(file => buildSampleObj(kit, file))
        resolve(sampleObjs);
      }
    })
  })
}

function getAllSampleObjects(kitDirectories){
  return Promise.all(kitDirectories.map(kit => buildSampleObjects(kit))).then(flatten)
}

exports.getSamplesMetaData = function() {
  return getKitDirectories().then(getAllSampleObjects)
}





