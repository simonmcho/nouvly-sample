const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs'); // hashing password

// Load User model
const User = require('../../models/User.js');

/****************************** 
* @route GET api/users/test
* @desc Tests users route
* @access Public
*******************************/
router.get('/test', (req, res) => {
    res.json({
        msg: 'Users works'
    });
});

/****************************** 
* @route GET api/users/register
* @desc Register User
* @access Public
*******************************/
router.post('/register', (req, res) => {
    // Check if email exists
    User.findOne({
        email: req.body.email
    }).then( user => { // If user exists, we want to send status 400
        if (user) {
            res.status(400).json({
                email: 'Email already exists!'
            }) ;
        } else {
            // Gravatar email
            const avatar = gravatar.url( // If there is an avatar, it'll be initialized to this variable, if not, it's this default
                req.body.email,
                {
                    s: '200', // Size
                    r: 'pg', // Rating
                    d: 'mm' // Default profile
                }
            );

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            // Generate salt with bcrypt to hash password with salt
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) console.log(err);
                    newUser.password = hash;
                    newUser.save() // Save user after hasing
                        .then(user => { // Respond with user
                            res.json(user); 
                        })
                        .catch( err => { // Error
                            console.log(err);
                        });
                });
            });
        }
    });
});


module.exports = router;