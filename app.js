// external module imports
const express = require('express');
const request = require('request');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
// class imports
const signup = require('./controllers/signup');
const signin = require('./controllers/signin');
const spotify = require('./controllers/spotify');
const help = require('./controllers/help');

// initialise server 
let app = express();
app.use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.json());
// initialise database
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

// routes
app.get('/', (req, res) => res.send("GENRIFY SERVER"));
app.get('/login', (req, res) => spotify.login(req, res, querystring));
app.get('/callback', (req, res) => spotify.callback(req, res, querystring, request));
app.get('/refresh_token', (req, res) => spotify.refresh_token(req, res, request));
app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt))
app.post('/signup', (req, res) => signup.handleSignUp(req, res, db, bcrypt));
app.post('/addHelp', (req, res) => help.addHelp(req, res, db));

app.listen(process.env.PORT);
