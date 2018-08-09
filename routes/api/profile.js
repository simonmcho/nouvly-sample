const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // since we need to deal with mongodb
const passport = require('passport'); // using for protected routes

const Profile = require('../../models/Profile.js'); // Load Profile Model
const User = require('../../models/User.js'); // Load User Model

/****************************** 
* @route GET api/profile/test
* @desc Tests profile route
* @access Public
*******************************/
router.get('/test', (req, res) => res.json({msg: 'Profile works'}));

/****************************** 
* @route GET api/profile
* @desc Get user profile
* @access Private
*******************************/
router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    const errors = {};

    Profile.findOne({
        user: req.user.id // must send object with user id
    }).then(profile => {
        if (!profile) { // Error if there is no profile
            errors.noprofile = 'There is no profile for this user!';
            return res.status(404).json(errors);
        }
        res.json(profile);
    }).catch(err => res.status(404).json(err));

});

/****************************** 
* @route GET api/profile
* @desc Create/Edit user profile
* @access Private
*******************************/
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Get fields
    const profileFields = {};

    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.field) profileFields.field = req.body.field;
    
    // Split into array for subjects and education
    if (typeof req.body.subjects !== 'undefined') {
        profileFields.subjects = req.body.subjects(',');
    }
    if (typeof req.body.education !== 'undefined') {
        profileFields.education = req.body.education(',');
    }

    // Social needs its own object (it's not an array)
    profileFields.social = {};

    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    if (req.body.rate) profileFields.rate = req.body.rate;

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (profile) { // If profile exists, the user will be editing, not creating
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true}
                ).then(profile => res.json(profile))
                .catch(err => res.status(404).json(error));
                
            } else { // Profile does not exist, so user is creating for the first time
                Profile.findOne({ handle: profileFields.handle})
                    .then(profile => {
                        if (profile) {
                            errors.handle = 'That handle already exists!';
                            return res.status(400).json(errors);
                        }

                        // Save profile
                        new Profile(profileFields).save().then(profile => res.json(profile));
                    })
            }
        })

});

module.exports = router;