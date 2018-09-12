const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const post = require('../../models/Post'); // Post model
const validatePostInput = require('../../validation/post'); // Validation


/* 
* @route    GET api/posts/test
* @desc     Tests post route
* @access   Public
*/
router.get('/test', (req, res) => {
    return res.json({ msg: 'Posts works!'});
});

/* 
* @route    POST api/posts
* @desc     Create posts
* @access   Private
*/
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    const newPost = new post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
});

/* 
* @route    GET api/posts
* @desc     Fetch all posts
* @access   Public
*/
router.get('/', (req, res) => {
    Post.find() // Get all posts
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(() => res.status(404).json({ nopostfound: 'posts router says: No posts exist!'}));
});

/* 
* @route    GET api/posts
* @desc     Fetch single post by id
* @access   Public
*/
router.get('/:id', (req, res) => {
    Post.findById(req.params.id) // Get a single post via id
        .then(post => res.json(post))
        .catch(() => res.status(404).json({ nopostfound: "posts router says: No post found with that ID!"}));
})


module.exports = router;