const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport'); // Main authentication module. Submodules like jwt and google oAuth exist under this

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
const mongoConnectTester = () => console.log('MongoDB connected!');
const mongoConnectFail = err => console.log(err);

mongoose
    .connect(db)
    .then(mongoConnectTester())
    .catch(mongoConnectFail());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport.js')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
