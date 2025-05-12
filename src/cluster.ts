import cluster from 'cluster';
import { cpus } from 'os';
import http from 'http';
import { PORT } from './config';
import { startServer } from './app';

if (cluster.isPrimary) {
    const numCPUs = cpus().length;
    console.log(`Primary process is running. Forking ${numCPUs - 1} workers...`);

    const workers: cluster.Worker[] = [];
    for (let i = 0; i < numCPUs - 1; i++) {
        const workerPort = PORT + i + 1;
        const worker = cluster.fork({ WORKER_PORT: workerPort });
        workers.push(worker);

        worker.on('online', () => {
            console.log(`Worker forked with port ${workerPort}`);
        });
    }

    let currentWorkerIndex = 0;

    const loadBalancer = http.createServer((req, res) => {
        const workerPort = PORT + currentWorkerIndex + 1;
        const proxy = http.request(
            {
                hostname: 'localhost',
                port: workerPort,
                path: req.url,
                method: req.method,
                headers: req.headers,
            },
            (workerRes) => {
                res.writeHead(workerRes.statusCode || 500, workerRes.headers);
                workerRes.pipe(res, { end: true });
            }
        );

        req.pipe(proxy, { end: true });

        proxy.on('error', (err) => {
            console.error(`Error proxying request to worker on port ${workerPort}:`, err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Internal Server Error' }));
        });

        currentWorkerIndex = (currentWorkerIndex + 1) % workers.length; // Round-robin
    });

    loadBalancer.listen(PORT, () => {
        console.log(`Load balancer is running on port ${PORT}`);
    });

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} exited. Forking a new worker...`);
        const newWorkerPort = PORT + workers.length + 1;
        const newWorker = cluster.fork({ WORKER_PORT: newWorkerPort });
        workers.push(newWorker);
    });
} else {
    const workerPort = parseInt(process.env.WORKER_PORT || '0', 10);
    if (!workerPort) {
        console.error('Worker port is not defined.');
        process.exit(1);
    }

    console.log(`Worker is starting on port ${workerPort}`);
    startServer(workerPort).catch((err) => {
        console.error(`Error starting worker on port ${workerPort}:`, err);
        process.exit(1);
    });
}
