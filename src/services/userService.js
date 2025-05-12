"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const uuid_1 = require("uuid");
let users = [];
const getUsers = () => users;
exports.getUsers = getUsers;
const createUser = (username, age, hobbies) => {
    const newUser = {
        id: (0, uuid_1.v4)(),
        username,
        age,
        hobbies,
    };
    users.push(newUser);
    return newUser;
};
exports.createUser = createUser;
const updateUser = (userId, username, age, hobbies) => {
    const index = users.findIndex(user => user.id === userId);
    if (index === -1)
        return null;
    users[index] = { id: userId, username, age, hobbies };
    return users[index];
};
exports.updateUser = updateUser;
const deleteUser = (userId) => {
    const index = users.findIndex(user => user.id === userId);
    if (index === -1)
        return false;
    users.splice(index, 1);
    return true;
};
exports.deleteUser = deleteUser;
