const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs'); // For encrypting password
const jwt = require('jsonwebtoken'); // For generating token
const keys = require('../../config/keys'); // For getting secret key
const passport = require('passport'); 

// Load Input Validation
const validateRegisterInput = require('../../validation/register');

// LOAD USER MODEL
const User = require('../../models/User');

/* 
* @route    GET api/users/test
* @desc     Tests users route
* @access   Public
*/
router.get('/test', (req, res) => {
    return res.json({ msg: 'Users works!'});
});

/* 
* @route    GET api/users/register
* @desc     Register a user
* @access   Public
*/
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body); // Get error data

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User
        .findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) { // If user exists
                return res.status(400).json({ email: 'Email already exists!' });
            } else {
                // If avatar exists, it will be initialized to this variable
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // Size
                    r: 'pg', // Rating
                    d: 'mm' // Default
                });

                //  Create new User Schema
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => { // Generate salt
                    bcrypt.hash(newUser.password, salt, (err, hash) => { // Hashify password
                        if (err) throw err;

                        newUser.password = hash; // Assign hashed password to the object password
                        newUser.save()  // save the user
                            .then(user => res.json(user)) // respond with user
                            .catch(err => console.log(err));
                    });
                });

            }
        })
});

/* 
* @route    GET api/users/login
* @desc     Login User - What it's really doing is that it returns a JWT Token
* @access   Public
*/
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Find user via email
    User
        .findOne({ email })
        .then(user => {
            if (!user) return res.status(404).json({ email: 'User email not found!' }); // If user not found, send json 

            // If user is found, check password. Remember, the user's password input is text, the password in db is hashed. So we need to use bcrypt to compare
            bcrypt.compare(password, user.password) // Compare user password vs database password
                .then(isMatch => {
                    if (isMatch) { // If passwords matched, generate JWT Token
                        // res.json({ msg: 'Success' });
                        const payload = { // Create jwt payload
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }

                        const expiry = { expiresIn: 3600 }; // Expiration date of token

                        // Sign Token
                        jwt.sign(payload, keys.secretOrKey, expiry, (err, token) => {
                            res.json({ // Return JSON with hashed token value and success status
                                success: true,
                                token: `Bearer ${token}`
                            })
                        });
                    } else return res.status(400).json({ success: false, password: 'Password incorrect!' }); // Password incorrect logic
                })
        })
});

/* 
* @route    GET api/users/current
* @desc     Return current user
* @access   Public
*/
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {//sesesion false because we're not using session
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});
module.exports = router;