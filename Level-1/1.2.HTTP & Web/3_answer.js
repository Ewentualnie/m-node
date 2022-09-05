function readHttpLikeInput() {
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for (; ;) {
        try {
            fs.readSync(0 /*stdin fd*/, buffer, 0, 1);
        } catch (e) {
            break; /* windows */
        }
        if (buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10)
                break;
            was10++;
        } else
            was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = //readHttpLikeInput();
    "GET /sum?nums=1,2,3 HTTP/1.1\n" +
    "Host: student.shpp.me\n"


function outputHttpResponse(statusCode, statusMessage, headers, body) {
    console.log(`${statusCode} ${statusMessage}
${Object.keys(headers).map(ind => "\n" + ind + ": " + headers[ind])}

${body}`);
}

function processHttpRequest($method, $uri, $headers, $body) {
    let statusCode = "HTTP/1.1 ", statusMessage, headers, body = "not found"
    if ($method === "GET" && $uri.startsWith("/sum?nums=")) {
        statusCode += 200
        statusMessage = "OK"
        body = $uri.match(/\d*/g).reduce((a, b) => a + +b, 0).toString()
    } else if ($method === "GET") {
        statusCode += 404
        statusMessage = "Not found"
    } else {
        statusCode += 400
        statusMessage = "Bad request"
    }
    headers = {
        "Date": new Date().toUTCString(),
        "Server": "Apache/2.2.14 (Win32)",
        "Content-Length": body.length,
        "Connection": "Closed",
        "Content-Type": "text/html; charset=utf-8"
    }

    outputHttpResponse(statusCode, statusMessage, headers, body);
}

function parseTcpStringAsHttpRequest(string) {
    let request = string.split("\n")
    return {
        method: request[0].split(" ")[0],
        uri: request[0].split(" ")[1],
        headers: request.slice(1, request.indexOf(""))
            .reduce((acc, value) => {
                acc[value.split(": ")[0]] = value.split(": ")[1]
                return acc
            }, {}),
        body: request.slice(request.indexOf("") + 1, request.indexOf("") + 2).join(),
    }
}

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);
