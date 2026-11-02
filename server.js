const { loadEnvFile } = require('node:process');
const { existsSync } = require('node:fs');
if (existsSync('.env')) {
    loadEnvFile('.env');
}
const app = require('./app');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
