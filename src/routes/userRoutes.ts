import { IncomingMessage, ServerResponse } from 'http';
import {
    getUsersController,
    createUserController,
    updateUserController,
    deleteUserController
} from '../controllers/userController';

export const userRoutes = (req: IncomingMessage, res: ServerResponse): void => {
    const { method, url } = req;
    const urlParts = url?.split('/');
    const userId = urlParts?.[3];

    if (url === '/api/users' && method === 'GET') {
        getUsersController(req, res);
        return;
    }

    if (url === '/api/users' && method === 'POST') {
        createUserController(req, res);
        return;
    }

    if (urlParts?.[1] === 'api' && urlParts?.[2] === 'users' && method === 'PUT' && userId) {
        updateUserController(req, res, userId);
        return;
    }

    if (urlParts?.[1] === 'api' && urlParts?.[2] === 'users' && method === 'DELETE' && userId) {
        deleteUserController(req, res, userId);
        return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
};
