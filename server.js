const express = require('express');
const fs = require('fs');
const { getSamplesMetaData } = require('./utils/utils.js');
const app = express();
const port = 8080;



app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get('/', (req, res) => res.render('index'));

app.get('/samplemetadata', (req, res) => {
  getSamplesMetaData('./public/samples/').then(sampleObjs => {
    res.json(sampleObjs);
  })

})

app.listen(port, () => console.log(`Jam.js server listening on port ${port}!`));