const pool = require('../db/config');

async function getAll() {
    const result = await pool.query('SELECT * FROM posts ORDER BY id');
    return result.rows;
}
async function getById(id) {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    return result.rows[0];
}
async function getByAuthor(authorId) {
    const result = await pool.query(
        `SELECT p.id, p.title, p.content, p.published, p.created_at,
                a.id AS author_id, a.name AS author_name, a.email AS author_email
         FROM posts p
         JOIN authors a ON a.id = p.author_id
         WHERE p.author_id = $1
         ORDER BY p.id`,
        [authorId]
    );
    return result.rows;
}
async function create(title, content, authorId, published) {
    const result = await pool.query(
        'INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, COALESCE($4, FALSE)) RETURNING *',
        [title, content, authorId, published]
    );
    return result.rows[0];
}
async function update(id, title, content, authorId, published) {
    const result = await pool.query(
        'UPDATE posts SET title = COALESCE($1, title), content = COALESCE($2, content), author_id = COALESCE($3, author_id), published = COALESCE($4, published) WHERE id = $5 RETURNING *',
        [title, content, authorId, published, id]
    );
    return result.rows[0];
}
async function remove(id) {
    const result = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    return result.rowCount;
}

module.exports = { getAll, getById, getByAuthor, create, update, remove };
