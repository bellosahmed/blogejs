const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// Create a new post
router.post('/create', async (req, res) => {
    try {
        // Create a new post in the database
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
        });

        // Redirect to the home page after creating the post
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating post');
    }
});

// Display all posts
router.get('/', async (req, res) => {
    try {
        // Retrieve all posts from the database in descending order
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']]
        });

        // Render the index view with the list of posts
        res.render('index', { posts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching posts');
    }
});

// Update a post - Display the edit form
router.get('/edit/:id', async (req, res) => {
    try {
        // Retrieve the post to be edited from the database
        const postId = req.params.id;
        const post = await Post.findByPk(postId);

        // Render the edit view with the post data
        res.render('edit', { post });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching post for edit');
    }
});

// Update a post - Handle form submission
router.post('/update/:id', async (req, res) => {
    try {
        // Update the post in the database
        const postId = req.params.id;
        await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: { id: postId }
            }
        );

        // Redirect to the home page after updating the post
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating post');
    }
});

// Delete a post
router.post('/delete/:id', async (req, res) => {
    try {
        // Delete the post from the database
        const postId = req.params.id;
        await Post.destroy({
            where: { id: postId }
        });

        // Redirect to the home page after deleting the post
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting post');
    }
});

// Display a single post
router.get('/post/:id', async (req, res) => {
    try {
        // Retrieve a single post from the database
        const postId = req.params.id;
        const post = await Post.findByPk(postId);

        // Render the post view with the post data
        res.render('post', { post });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching post');
    }
});

// Display the "Create Post" page
router.get('/create', (req, res) => {
    // Render the create view for creating a new post
    res.render('create');
});

module.exports = router;
