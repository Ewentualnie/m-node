const udp = require('dgram');
const port = 8002;
const host = '127.0.0.1';
const message = "hello UDP server"

let date;

const client = udp.createSocket('udp4');

client.send(message, port, host, () => {
    console.log(`Send to server:  "${message}"`);
    date = new Date();
});

client.on('message', data => {
    console.log(`Get from server: "${data}"`);
    console.log(`comparison:      "${message === data.toString()}"`);
    console.log(`Answer get after ${(new Date() - date) / 1000} sec.`)
    client.close()
});