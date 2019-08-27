const samples = '../public/samples/';
const kit = 'pork'
const fs = require('fs');

fs.readdir(samples + kit, (err, files) => {
  const data = []
  files.forEach(file => {
    if (file.endsWith('.mp3')) {
      let sampleObj = {}
      sampleObj.kit = kit;
      sampleObj.name = file.substring(0, file.length - 4);
      sampleObj.path = 'samples/' + kit + '/' + file;
      data.push(sampleObj);
    }
  });
  console.log(data);
});
