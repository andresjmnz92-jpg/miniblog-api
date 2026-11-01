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

module.exports = app;


