"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUsersController = void 0;
const userService_1 = require("../services/userService");
const getUsersController = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify((0, userService_1.getUsers)()));
};
exports.getUsersController = getUsersController;
const createUserController = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        try {
            const { username, age, hobbies } = JSON.parse(body);
            if (!username || !age || !hobbies || !Array.isArray(hobbies)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Missing required fields' }));
                return;
            }
            const newUser = (0, userService_1.createUser)(username, age, hobbies);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        }
        catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid JSON body' }));
        }
    });
};
exports.createUserController = createUserController;
const updateUserController = (req, res, userId) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        try {
            const { username, age, hobbies } = JSON.parse(body);
            if (!username || !age || !hobbies || !Array.isArray(hobbies)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Missing required fields' }));
                return;
            }
            const updatedUser = (0, userService_1.updateUser)(userId, username, age, hobbies);
            if (!updatedUser) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedUser));
        }
        catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid JSON body' }));
        }
    });
};
exports.updateUserController = updateUserController;
const deleteUserController = (req, res, userId) => {
    const success = (0, userService_1.deleteUser)(userId);
    if (!success) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
    }
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end();
};
exports.deleteUserController = deleteUserController;
