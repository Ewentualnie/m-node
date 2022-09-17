const net = require('net');
const port = 8000;
const host = '127.0.0.1';

const server = net.createServer(socket => {
    socket.on("data", data => {
        console.log(`Client send: "${data}"`);
        this.data = data;
    })
    socket.on('end', () =>
        socket.write(this.data));
});

server.on('connection', socket =>
    console.log(`Client connected from: ${socket.localAddress}:${socket.localPort}`));

server.listen(port, host, () =>
    console.log(`Server started on ${host}:${port}`));