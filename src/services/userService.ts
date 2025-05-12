import { User } from '../models/user';
import { v4 as uuidv4 } from 'uuid';

let users: User[] = [];

export const getUsers = (): User[] => users;

export const createUser = (username: string, age: number, hobbies: string[]): User => {
    const newUser: User = {
        id: uuidv4(),
        username,
        age,
        hobbies,
    };
    users.push(newUser);
    return newUser;
};

export const updateUser = (userId: string, username: string, age: number, hobbies: string[]): User | null => {
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) return null;

    users[index] = { id: userId, username, age, hobbies };
    return users[index];
};
