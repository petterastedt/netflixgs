const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./routes/routes.js')(app);

//Database configuration
const dbConfig = require('./config/databaseConfig.js');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
  }).then(() => {
  console.log("Successfully connected to the database");    
  }).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
  });

app.get('/', (req, res) => {
  res.json({"message": "Hello world!"});
});

app.listen(process.env.PORT, () => {
  console.log('Backend live at port', process.env.PORT)
})

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));
