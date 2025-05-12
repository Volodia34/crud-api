import { createServer } from 'http';
import { userRoutes } from './routes/userRoutes';
import {PORT} from "./config";

export const startServer = (port: number) => {
    const server = createServer(userRoutes);
    return new Promise((resolve) => {
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
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



startServer(PORT).then(() => {
    console.log(`Development server is running on http://localhost:${PORT}`);
}).catch((err) => {
    console.error('Failed to start the server:', err);
});
