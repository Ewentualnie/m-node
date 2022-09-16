const net = require('net');
const port = 8000;
const host = '127.0.0.1';

const client = new net.Socket();
client.connect(port, host, () => {
    console.log('Connected with port ' + port + ", host is: " + host);
    client.write('Hello, server!');
});

client.on('data', data => {
    console.log('Received from server: ' + data);
    client.destroy(); // kill client after server's response
});

client.on('close', () => {
    console.log('Connection closed');
});