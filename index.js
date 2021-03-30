const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const dbUrl = 'mongodb+srv://admin:admin@cluster0.uulqf.mongodb.net/common?retryWrites=true&w=majority'

const PORT = process.env.PORT || 3000

const recordScheme = new mongoose.Schema({
  startTime: Number,
  value: String,
  label: String,
  location: String,
}, { versionKey: false });

const Record = mongoose.model('Record', recordScheme);

const app = express();

const whitelist = [
  'https://gomonday.se',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'http://localhost:3004',
  'http://localhost:3005',
]

app.use(cors({
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//serving the static content inside our public folder
app.use(express.static('public'));

app.get('/logger', (req, res) => {
  Record.find({}, function(err, users){
  if(err) return console.log(err);
    res.send(users)
  });
});

app.post('/logger', (req, res) => {
  if(!req.body) return res.sendStatus(400);

  const {
    startTime,
    value,
    label,
    location,
  } = req.body

  const newRecord = new Record({
    startTime,
    value,
    label,
    location,
  });
      
  newRecord.save(function(err){
    if(err) return console.log(err);
    res.send(newRecord);
  });
});

mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, (err) => {
  if (err) return console.log(err);
  app.listen(PORT, () => console.log(`Listening on ${PORT}`))
});
