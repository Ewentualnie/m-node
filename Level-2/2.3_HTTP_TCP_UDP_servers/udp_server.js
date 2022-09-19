const udp = require('dgram');
const port = 8002;
const host = '127.0.0.1';

const server = udp.createSocket('udp4');

server.on('message', (data, info) => {
    console.log(`${new Date().toUTCString()}: client connected from: ${info.address}:${info.port}`)
    console.log(`${new Date().toUTCString()}: client send: "${data}"`);

    server.send(data, info.port);

    console.log(`${new Date().toUTCString()}: session is closed`);
});

server.bind(port, host, () =>
    console.log(`${new Date().toUTCString()}: Server started on ${host}:${port}`));
