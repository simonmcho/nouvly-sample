const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post'); // Post model
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

    if (!isValid) return res.status(400).json(errors); // If any validation errors, send 400 with errors object

    const userID = { user: req.user.id };
    Post.findOne(userId)
        .then(profile => {
            Post.findById(req.params.id)
                .then() // need to check posts, if exists, update, if not, create
        })

    const newPost = new Post({
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
});

/* 
* @route    DELETE api/posts
* @desc     Delete post
* @access   Private
*/
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userID = { user: req.user.id };
    Profile.findOne(userID) // Find user by id
        .then(profile => {
            
            Post.findById(req.params.id) // Now that we got the correct user profile, we find the post by id
                .then(post => {
                    
                    if (post.user.toString() !== req.user.id) { // Check that the user deleting the post is their own
                        return res.status(401).json({ notauthorized: 'posts router says: User is not authorized!' }); // 401 is an unauthorized status
                    }

                    // Delete post
                    post.remove().then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ postnotfound: 'posts router says: Post not found!'}))
        })
        .catch(() => res.status(404).json({ usernotfound: 'posts router says: User not found!'}));
});


module.exports = router;