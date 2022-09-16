const net = require('net');
const port = 8000;
const host = '127.0.0.1';

const server = net.createServer(socket => {
    socket.write('Hello client!\n');
    socket.on("data", data => console.log("Server get: \"" + data + "\""))
});

function launchInfo() {
    console.log("Server started on port: " + port + ", host name is: " + host)
}

server.listen(port, host, () => launchInfo())