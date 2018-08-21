const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

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

                
            }
        })
});

module.exports = router;