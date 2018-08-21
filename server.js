const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// DB CONFIG
const db = require('./config/keys').mongoURI;

// API ROUTES
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Connect to MonogoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send("HELLO WORLS!"));

// USE ROUTES
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


// Port for server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`SERVER RUNNING ON ${port}`));