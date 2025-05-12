import { createServer } from 'http';
import { userRoutes } from './routes/userRoutes';
import { PORT } from './config';

export const startServer = () => {
    const server = createServer(userRoutes);
    return new Promise((resolve) => {
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            resolve(server);
        });
    });
};

export const stopServer = (server: ReturnType<typeof createServer>) => {
    return new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) reject(err);
            else resolve(null);
        });
    });
};

startServer().catch((err) => {
    console.error('Error starting the server:', err);
});
