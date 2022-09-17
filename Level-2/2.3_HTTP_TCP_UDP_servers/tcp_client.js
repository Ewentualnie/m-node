const net = require('net');
const port = 8000;
const host = '127.0.0.1';
const message = "hello TCP server"

let date = new Date();

const client = new net.Socket();

client.connect(port, host);

client.write(message);

client.on('data', data => {
    console.log(`Send to server:  "${message}"`);
    console.log(`Get from server: "${data}"`)
    console.log(`comparison:      "${message == data}"`)
});

client.on('close', () =>
    console.log(`Answer get after ${(new Date() - date) / 1000} sec.`));

client.end();