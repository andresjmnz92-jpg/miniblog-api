import { describe, test, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('Authors', () => {
    test('GET /authors/1 devuelve el autor', async () => {
        const res = await request(app).get('/authors/1');

        expect(res.status).toBe(200);
        expect(res.body.id).toBe(1);
        expect(res.body.name).toBe('Ana García');
    });
        test('POST /authors crea un autor', async () => {
        const email = `test${Date.now()}@mail.com`;

        const res = await request(app)
            .post('/authors')
            .send({ name: 'Autor Test', email });

        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Autor Test');
        expect(res.body.id).toBeDefined();

        await request(app).delete(`/authors/${res.body.id}`);
    });

});
