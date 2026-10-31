const express = require('express');
const router = express.Router();
const authorsService = require('../services/authors.service');

router.get('/', async (req, res) => {
    try {
        const authors = await authorsService.getAll();
        res.json(authors);
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
        const author = await authorsService.getById(id);
        if (!author) {
            return res.status(404).json({ error: 'author not found' });
        }
        res.json(author);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal server error' });
    }
});

router.post('/', async (req, res) => {
    const { name, email, bio } = req.body;
    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'name is required' });
    }
    if (!email) {
        return res.status(400).json({ error: 'email is required' });
    }
    try {
        const newAuthor = await authorsService.create(name, email, bio);
        res.status(201).json(newAuthor);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ error: 'email already exists' });
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
    const { name, email, bio } = req.body;
    if (name !== undefined && name.trim() === '') {
        return res.status(400).json({ error: 'name cannot be empty' });
    }
    try {
        const author = await authorsService.update(id, name, email, bio);
        if (!author) {
            return res.status(404).json({ error: 'author not found' });
        }
        res.json(author);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ error: 'email already exists' });
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
        const deleted = await authorsService.remove(id);
        if (deleted === 0) {
            return res.status(404).json({ error: 'author not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal server error' });
    }
});
module.exports = router;