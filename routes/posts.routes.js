const express = require('express');
const router = express.Router();
const postsService = require('../services/posts.service');

function isEmpty(value) {
    return typeof value !== 'string' || value.trim() === '';
}

router.get('/', async (req, res) => {
    try {
        const posts = await postsService.getAll();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal server error' });
    }
});

router.get('/author/:authorId', async (req, res) => {
    const authorId = Number(req.params.authorId);
    if (Number.isNaN(authorId)) {
        return res.status(400).json({ error: 'authorId must be a number' });
    }
    try {
        const posts = await postsService.getByAuthor(authorId);
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'id must be a number' });
    }
    try {
        const post = await postsService.getById(id);
        if (!post) {
            return res.status(404).json({ error: 'post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal server error' });
    }
});

router.post('/', async (req, res) => {
    const { title, content, author_id, published } = req.body;
    if (isEmpty(title)) {
        return res.status(400).json({ error: 'title is required' });
    }
    if (isEmpty(content)) {
        return res.status(400).json({ error: 'content is required' });
    }
    if (!Number.isInteger(author_id)) {
        return res.status(400).json({ error: 'author_id is required and must be a number' });
    }
    try {
        const newPost = await postsService.create(title, content, author_id, published);
        res.status(201).json(newPost);
    } catch (error) {
        if (error.code === '23503') {
            return res.status(404).json({ error: 'author not found' });
        }
        console.error(error);
        res.status(500).json({ error: 'internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'id must be a number' });
    }
    const { title, content, author_id, published } = req.body;
    if (title !== undefined && isEmpty(title)) {
        return res.status(400).json({ error: 'title cannot be empty' });
    }
    if (content !== undefined && isEmpty(content)) {
        return res.status(400).json({ error: 'content cannot be empty' });
    }
    if (author_id !== undefined && !Number.isInteger(author_id)) {
        return res.status(400).json({ error: 'author_id must be a number' });
    }
    try {
        const post = await postsService.update(id, title, content, author_id, published);
        if (!post) {
            return res.status(404).json({ error: 'post not found' });
        }
        res.json(post);
    } catch (error) {
        if (error.code === '23503') {
            return res.status(404).json({ error: 'author not found' });
        }
        console.error(error);
        res.status(500).json({ error: 'internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'id must be a number' });
    }
    try {
        const deleted = await postsService.remove(id);
        if (deleted === 0) {
            return res.status(404).json({ error: 'post not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal server error' });
    }
});

module.exports = router;
