const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// Create a new blog post
router.post('/create', async (req, res) => {
    try {
        await Post.create({
            title: req.body.title,
            content: req.body.content,
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});

// Display all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.render('index', { posts }); // Pass the posts variable
    } catch (error) {
        console.error(error);
    }
});

// Update  post
router.get('/edit/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);
        res.render('edit', { post });
    } catch (error) {
        console.error(error);
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        await Post.update({
            title: req.body.title,
            content: req.body.content,
        }, {
            where: { id: postId }
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});

// Delete  post
router.post('/delete/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        await Post.destroy({
            where: { id: postId }
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;
