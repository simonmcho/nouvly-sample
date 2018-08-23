const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// API ROUTES
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// DB STUFF
const db = require('./config/keys').mongoURI; // DB Config

// Connect to MonogoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

// PASSPORT MIDDLEWARE
app.use(passport.initialize());

require('./config/passport.js')(passport); // Passport Config

// USE ROUTES
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


// PORT FOR SERVER
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`SERVER RUNNING ON ${port}`));