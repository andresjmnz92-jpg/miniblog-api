const express = require('express');
const app = express();
app.use(express.json());
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
const authorsRouter = require('./routes/authors.routes');
app.use('/authors', authorsRouter);
const postsRouter = require('./routes/posts.routes');
app.use('/posts', postsRouter);

app.use((req, res) => {
    res.status(404).json({ error: 'route not found' });
});

app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'invalid JSON' });
    }
    console.error(err);
    res.status(500).json({ error: 'internal server error' });
});

module.exports = app;


