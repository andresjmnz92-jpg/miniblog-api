import { describe, test, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('Posts', () => {
    test('POST /posts crea un post', async () => {
        const res = await request(app)
            .post('/posts')
            .send({ title: 'Post Test', content: 'Contenido de prueba', author_id: 1 });

        expect(res.status).toBe(201);
        expect(res.body.title).toBe('Post Test');
        expect(res.body.author_id).toBe(1);
        expect(res.body.published).toBe(false);

        await request(app).delete(`/posts/${res.body.id}`);
    });

    test('DELETE /posts/99999 devuelve 404', async () => {
        const res = await request(app).delete('/posts/99999');

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('post not found');
    });
});
