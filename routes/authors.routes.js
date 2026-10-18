const express = require('express');
const router = express.Router();

let authors = [
    { id: 1, name: 'Ana Garcia', email: 'ana@example.com', bio: 'Desarrolladora full-stack apasionada por Node.js' },
    { id: 2, name: 'Carlos Ruiz', email: 'carlos@example.com', bio: 'Escritor tecnico especializado en base de datos' },
    { id: 3, name: 'Maria Lopez', email: 'maria@example.com', bio: 'Ingeniera de software con foco en APIs REST' },
];
let nextId = 4;
router.get('/', (req, res) => {
    res.json(authors);
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'id must be a number' });
    }
    const author = authors.find(a => a.id === id);
    if (!author) {
        return res.status(404).json({ error: 'author not found'});
    }
    res.json(author);
});

router.post('/', (req, res) => {
    const { name, email, bio } = req.body;
    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'name is required' });
    }
    if (!email) {
        return res.status(400).json({ error: 'email is required' });
    }
    if (authors.some(a => a.email === email)) {
        return res.status(400).json({ error: 'email already exists' });
    }
    const newAuthor = { id: nextId++, name, email, bio };
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'id must be a number'});
    }
    const author = authors.find(a => a.id === id);
    if (!author) {
        return res.status(404).json({ error: 'author not found'});
    }
    const { name, email, bio } = req.body;
    if (name !== undefined && name.trim() === '') {
        return res.status(400).json({ error: 'name cannot be empty'});
    }
    if (email !== undefined && authors.some(a => a.email === email && a.id !== id)) {
        return res.status(400).json({ error: 'email already exist'});
    }
    if (name !== undefined) author.name = name;
    if (email !== undefined) author.email = email;
    if (bio !== undefined) author.bio = bio;
    res.json(author);
});
module.exports = router;