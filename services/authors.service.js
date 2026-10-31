const pool = require('../db/config');
async function getAll() {
    const result = await pool.query('SELECT * FROM authors ORDER BY id');
    return result.rows;
}
async function getById(id) {
    const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
    return result.rows[0];
}
async function create(name, email, bio) {
    const result = await pool.query(
        'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
        [name, email, bio]
    );
    return result.rows[0];
}
async function update(id, name, email, bio) {
    const result = await pool.query(
        'UPDATE authors SET name = COALESCE($1, name), email = COALESCE($2, email), bio = COALESCE($3, bio) WHERE id = $4 RETURNING *',
        [name, email, bio, id]
    );
    return result.rows[0];
}
async function remove(id) {
    const result = await pool.query('DELETE FROM authors WHERE id = $1', [id]);
    return result.rowCount;
}

module.exports = { getAll, getById, create, update, remove };
