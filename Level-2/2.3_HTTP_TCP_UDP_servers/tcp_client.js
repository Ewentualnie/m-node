const net = require('net');
const port = 8000;
const host = '127.0.0.1';
const message = "hello TCP server"

let date;

const client = new net.Socket();

client.connect(port, host);

client.write(message, () => date = new Date());

client.on('data', data => {
    console.log(`Send to server:  "${message}"`);
    console.log(`Get from server: "${data}"`)
    console.log(`comparison:      "${message === data.toString()}"`)
});

client.on('close', () =>
    console.log(`Answer get after ${(new Date() - date) / 1000} sec.`));

client.end();