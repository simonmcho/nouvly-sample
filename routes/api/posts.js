const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
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

    Post.findOne(userID)
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

/* 
* @route    POST api/posts/like/:id
* @desc     Like post
* @access   Private
*/
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userID = req.user.id;
    console.log(req.params.id);
    Post.findById(req.params.id) // Now that we got the correct user profile, we find the post by id
        .then(post => { 
            
            if (post.likes.filter(like => like.user.toString() === userID).length > 0) {
                return res.status(400).json({ alreadyLiked: "posts router says: User already liked!" });
            }

            // Add user id to likes array
            post.likes.unshift({ user: userID });
            console.log(post.likes);
            post.save().then(post => res.json(post)).catch(err =>console.log(err))
        })
        .catch(err => res.status(404).json({ postnotfound: 'posts router says: Post not found!'}))

});

/* 
* @route    DELETE api/posts/like/:id
* @desc     Unlike post
* @access   Private
*/
router.delete('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userID = req.user.id;
    const postID = req.params.id;
    
    Post.findById(postID) // Now that we got the correct user profile, we find the post by id
        .then(post => { 
            
            if (!post.likes.filter(like => like.user.toString() === userID).length) {
                return res.status(400).json({ notLiked: "You have not liked this post!" });
            }

            // remove user id from array
            const removeIndex = post.likes
                .map(item => item.user.toString())
                .indexOf(req.user.id);

            post.likes.splice(removeIndex, 1);
            
            // Save
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'posts router says: Post not found!'}))

});

/* 
* @route    POST api/posts/comment/:id
* @desc     Add comment to post
* @access   Private
*/
router.post('/comment/:id', passport.authenticate('jwt', { session: false}), (req, res) => {

    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) { return res.status(400).json(errors) };

    Post.findById(req.params.id) 
    .then(post => {
        // Object containing comment information
        const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        }

        post.comments.unshift(newComment); // Add to comments array

        post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: 'post router says: no post found to comment on!' }));
});

/* 
* @route    DELETE api/posts/comment/:id/:comment_id
* @desc     Delete comment to post
* @access   Private
*/
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    
    Post.findById(req.params.id)
        .then(post => {
            // Check to see if comment exists
            if (!post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length) {
                return res.json(404).json({ nocomment: 'posts router says: This comment does not exist to delete it!' });
            }

            // Get remove index
            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comments_id);

            post.comments.splice(removeIndex, 1); // Splice comment out of array

            post.save().then(post => res.json(post)); // Save post with new array of comments
        }).catch(err => res.status(404).json({ postnotfound: 'post router says: post not found!'}));
});


module.exports = router;