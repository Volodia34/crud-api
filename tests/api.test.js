const request = require('supertest');
const { startServer, stopServer } = require('../src/app');

let server;

beforeAll(async () => {
    server = await startServer();
});

afterAll(async () => {
    await stopServer(server);
});

describe('API /users', () => {
    let createdUserId;

    it('should return an empty array when getting all users', async () => {
        const res = await request(server).get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('should create a new user', async () => {
        const newUser = { username: 'John Doe', age: 30, hobbies: ['reading', 'gaming'] };
        const res = await request(server).post('/api/users').send(newUser);
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(newUser);
        createdUserId = res.body.id;
    });

    it('should get the created user by ID', async () => {
        const res = await request(server).get(`/api/users/${createdUserId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(createdUserId);
    });

    it('should update the created user', async () => {
        const updatedUser = { username: 'Jane Doe', age: 25, hobbies: ['traveling'] };
        const res = await request(server).put(`/api/users/${createdUserId}`).send(updatedUser);
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({ id: createdUserId, ...updatedUser });
    });

    it('should delete the created user', async () => {
        const res = await request(server).delete(`/api/users/${createdUserId}`);
        expect(res.statusCode).toBe(204);
    });

    it('should return 404 when trying to get a deleted user', async () => {
        const res = await request(server).get(`/api/users/${createdUserId}`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ message: 'User not found' });
    });
});
