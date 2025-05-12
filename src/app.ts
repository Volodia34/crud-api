import { createServer } from 'http';
import { userRoutes } from './routes/userRoutes';

const server = createServer(userRoutes);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
