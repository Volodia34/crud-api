import http from 'http';
import { PORT } from './config';
import { requestHandler } from './app';


const server = http.createServer(requestHandler);


server.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
});
