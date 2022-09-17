const http = require('http');
const port = 8001;
const host = '127.0.0.1';
const message = 'hello HTTP server';

let date = new Date();

const post = {
    hostname: host,
    port: port,
    method: 'POST'
};

let request = http.request(post, res => {

    res.on('data', data => {
        console.log(`Send to server:  "${message}"`);
        console.log(`Get from server: "${data}"`)
        console.log(`comparison:      "${message == data}"`)
    });

    res.on('end', () => {
        console.log(`Answer get after ${(new Date() - date) / 1000} sec.`);
    });
});

request.write(message);
request.end();