const net = require('net');
const port = 8000;
const host = '127.0.0.1';

const server = net.createServer(socket => {
    socket.on("data", data => {
        console.log(`${new Date()}: client send: "${data}"`);
        this.data = data;
    })
    socket.on('end', () => {
        console.log(`${new Date()}: session is closed`);
        socket.write(this.data);
    });
});

server.on('connection', socket =>
    console.log(`${new Date()}: client connected from: ${socket.localAddress}:${socket.localPort}`));

server.listen(port, host, () =>
    console.log(`${new Date()}: Server started on ${host}:${port}`));