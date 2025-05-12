import './app';
import {PORT} from "./config";
import {startServer} from "./app";



startServer(PORT).then(() => {
    console.log(`Development server is running on http://localhost:${PORT}`);
}).catch((err) => {
    console.error('Failed to start the server:', err);
});
