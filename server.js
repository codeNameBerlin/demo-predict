const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const signup = require('./controllers/signup');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'enter',
    database : 'smartbraindemo'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.send('it is working!')} );

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)} );

app.post('/register', (req, res) => {signup.handleSignup(req, res, db, bcrypt)} );

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)} );

app.put('/image/',  (req, res) => {image.handleImage(req, res, db)} );

app.post('/imageurl/',  (req, res) => {image.handleApiCall(req, res)} );

app.listen(process.env.PORT, () => {
	console.log(`app is running on port ${process.env.PORT}`)
});

// res => this is working
// signin => POST user
// signup => POST user
// profile/user:id => GET user
// image => PUT user

// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//   // Store hash in your password DB.
// });
// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
//     // res == false
// });