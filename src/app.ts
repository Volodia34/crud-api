import { IncomingMessage, ServerResponse } from 'http';

export const requestHandler = (req: IncomingMessage, res: ServerResponse): void => {
    const { method, url } = req;


    if (url === '/api/health' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'OK' }));
        return;
    }


    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
};
