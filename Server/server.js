require('./config/config');

const express = require('Express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./Controller/usuario'));

// app.get('/', function(req, res) {
//     res.json('Comienzo')
// })

mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
    if (err) throw err;
    // console.log(res);
    console.log('Base de datos CONECTADA');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', process.env.PORT);
})