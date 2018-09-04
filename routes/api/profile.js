const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Profile
const User = require('../../models/User');

const validateProfileInput = require('../../validation/profile');

/* 
* @route    GET api/profile/test
* @desc     Tests profile route
* @access   Public
*/
router.get('/test', (req, res) => res.json({ msg: 'Users works!'}));

/* 
* @route    GET api/profile
* @desc     Get current users profile
* @access   Private
*/
router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    const errors = {};
    
    Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar']) // Once found, populates user with an object with k/v pair of name and avatar
        .then(profile => {
            if (!profile) { // If no profile, send 404
                errors.noProfile = 'There is no profile for this user!';
                return res.status(404).json(errors);
            }

            res.json(profile); // Send json of profile
        })
        .catch(err => res.status(404).json(err));
});

/* 
* @route    GET api/profile/all
* @access   Public
*/
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
        if (!profiles) {
            errors.noprofiles = 'There are no profiles';
            return res.status(404).json(errors);
        }

        res.json(profiles);
    })
    .catch(() => {
        errors.profiles = 'Profile code error: No profiles!?';
        return res.status(400).json(errors);
    });
});

/* 
* @route    GET api/profile/handle/:handle - backend api route, but not the URL the user sees
* @desc     Get profile by handle
* @access   Public
*/
router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({ handle: req.params.handle }) // Find by handle
        .populate('user', ['name', 'avatar']) // Populate the user object with id, name, avatar
        .then(profile => {
            if (!profile) { // If profile is undefined/null, send error
                errors.noprofile = 'Profile code error: There is no profile for this handle!';
                res.status(404).json(errors);
            }

            res.json(profile); // Send profile if profile exists
        })
        .catch(err => res.status(404).json(err));
});

/* 
* @route    GET api/profile/handle/:handle - backend api route, but not the URL the user sees
* @desc     Get profile by handle
* @access   Public
*/
router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.params.user_id}) // Find profile by user_id
        .populate('user', ['name', 'avatar']) // Populate user object with id, name, avatar
        .then(profile => { 
            if (!profile) { // If profile is undefined/null, send error message
                errors.noprofile = 'Profile code error: There is no profile for this user id!';
                res.status(404).json(errors);
            }
            
            res.json(profile); // Send Profile
        })
        .catch(() => {
            errors.profile = 'Profile code error: There is no profile for this user id!';
            return res.status(404).json(errors);
        });
});

/* 
* @route    POST api/profile
* @desc     Create or edit user profile
* @access   Private
*/
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body);
    const { errors, isValid } = validateProfileInput(req.body);
    
    if (!isValid) return res.status(400).json(errors); // Return 400 error if profile input has errors

    // Get fields
    const profileFields = {};

    // Add key/value pairs to profileFields object from user entry
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;

    // Skills
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;

    console.log(req.body);

    Profile.findOne({ user: req.user.id })
        .then(profile => {

            // If profile already exists, we are updating
            if (profile) {
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                ).then(profile => {
                    // return res.json(profile);
                    res.json(profile);
                });
            } else {
                // Check if handle exists
                Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                        if (profile) {
                            errors.handle = 'Checking in profile code, but that handle already exists!';
                            res.status(400).json(errors);
                        }
                        // Create new profile if could not find profile handle
                        new Profile(profileFields).save().then(profile => res.json(profile));
                    })
            }
        });
});

module.exports = router;