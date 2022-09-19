const http = require('http');
const port = 8001;
const host = '127.0.0.1';

const server = http.createServer();

server.on('connection', socket =>
    console.log(`${new Date()}: client connected from: ${socket.localAddress}:${socket.localPort}`));

server.on('request', (req, res) => {
    req.on('data', data => {
        console.log(`${new Date()}: client send: "${data}"`);
        this.data = data;
    });

    req.on('end', () => {
        console.log(`${new Date()}: session is closed`);
        res.end(this.data);
    });
});

server.listen(port, host, () =>
    console.log(`${new Date()}: Server started on ${host}:${port}`));