import { IncomingMessage, ServerResponse } from 'http';
import {getUsers, createUser, updateUser} from '../services/userService';

export const getUsersController = (req: IncomingMessage, res: ServerResponse): void => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(getUsers()));
};

export const createUserController = (req: IncomingMessage, res: ServerResponse): void => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        try {
            const { username, age, hobbies }: { username: string; age: number; hobbies: string[] } = JSON.parse(body);

            if (!username || !age || !hobbies || !Array.isArray(hobbies)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Missing required fields' }));
                return;
            }

            const newUser = createUser(username, age, hobbies);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid JSON body' }));
        }
    });
};


export const updateUserController = (req: IncomingMessage, res: ServerResponse, userId: string): void => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        try {
            const { username, age, hobbies }: { username: string; age: number; hobbies: string[] } = JSON.parse(body);

            if (!username || !age || !hobbies || !Array.isArray(hobbies)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Missing required fields' }));
                return;
            }

            const updatedUser = updateUser(userId, username, age, hobbies);
            if (!updatedUser) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedUser));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid JSON body' }));
        }
    });
};
