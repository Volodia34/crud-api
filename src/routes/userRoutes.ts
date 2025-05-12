import { IncomingMessage, ServerResponse } from 'http';
import { getUsersController, createUserController } from '../controllers/userController';

export const userRoutes = (req: IncomingMessage, res: ServerResponse): void => {
    const { method, url } = req;

    if (url === '/api/users' && method === 'GET') {
        getUsersController(req, res);
        return;
    }

    if (url === '/api/users' && method === 'POST') {
        createUserController(req, res);
        return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
};
