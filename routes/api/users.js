const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs'); // hashing password
const jwt = require('jsonwebtoken'); //for JWT
const keys = require('../../config/keys');
const passport = require('passport'); // Needed to create protected route

// Load Input Validation
const validateRegisterInput = require('../../validation/register.js');
const validateLoginInput = require('../../validation/login.js');

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
    // Here, req.body has whatever we said body has in postman when making a post request to /register
    // console.log("SEE BELOW FOR BODY INFO!!!!")
    // console.log(req.body);
    // console.log("SEE ABOVE FOR BODY INFO!!!!")
    const { errors, isValid } = validateRegisterInput(req.body); // Variables are the return values of register.js

    // Check Validation
    if (!isValid) { // If it's not valid, it means the errors object has something in it
        return res.status(400).json(errors);
    }
    // Check if email exists
    User.findOne({
        email: req.body.email
    }).then( user => { // If user exists, we want to send status 400
        errors.email = "Email already exists!"; // Add key value pair to errors object from validation/register.js
        if (user) {
            res.status(400).json(errors) ;
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

/****************************** 
* @route GET api/users/login
* @desc Login user (return JWT, the JSON Web Token)
* @access Public
*******************************/
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) return res.status(400).json(errors); // Return 400 status if errors is not empty

    const email = req.body.email; // the user's entries
    const password = req.body.password; // the user's entries

    // Find the user by email
    User.findOne({ // mongoose method
        email // find email: email
    }).then(user => { // if found...
        // Check for user - if there is no user, user returns false
        // if (!user) {
        //     errors.email = 'Email not found...';
        //     return res.status(404).json(errors); // Not found!
        // }
        if (typeof errors.email !== 'undefined') return res.status(404).json(errors); // No email entered?

        if (typeof errors.password !== 'undefined') return res.status(404).json(errors); // No password entered?

        // Check passsword
        bcrypt.compare(password, user.password) // compare user entered password vs actual password in db (hashed)
            .then(isMatch => { // After comparing, returns isMatch
                if (isMatch) { // If entered password matches password in DB, enter here. We get token back here
                    const payload = { // Create jwt payload
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    } 
                    jwt.sign(
                        payload, // The created payload
                        keys.secretOrKey, // In our config file...still not sure what secretOrKey is
                        { expiresIn: 3600 }, // Key is thrown out after an hour
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                    }); 
                } else { // If entered password does not match password in DB, enter here
                    errors.password = 'Password incorrect!';
                    return res.status(400).json(errors);
                }
            })
    })

});

/****************************** 
* @route GET api/users/current
* @desc Return current user
* @access Private
*******************************/
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => { // jwt is the strategy 
    // Once authenticated via passport using our config, the user object is in the request
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});


module.exports = router;