const pool = require('../db/config');
async function getAll() {
    const result = await pool.query('SELECT * FROM authors ORDER BY id');
    return result.rows;
}
async function getById(id) {
    const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
    return result.rows[0];
}

module.exports = { getAll, getById };
