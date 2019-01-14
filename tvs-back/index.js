const upload = require('./uploader/index');
const express = require('express');
const bodyParser = require('body-parser');

const initDb = require('./db/init');
initDb();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const setupRoutes = require('./routes/index');
setupRoutes(app);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

process.argv.forEach(function (val, index, array) {
    if(val === 'upload-data'){
        upload();
    } 
  });