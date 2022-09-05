

function outputHttpResponse(statusCode, statusMessage, headers, body) {
    console.log(`${statusCode} ${statusMessage}
${Object.keys(headers).map((value, index) =>
        index > 0 ? "\n" + value + ": " + headers[value] : value + ": " + headers[value]
    )}

${body}`);
}

function processHttpRequest(method, uri, headers, body) {
    let statusCode = "HTTP1/1 ", statusMessage
    if (uri !== "/api/checkLoginAndPassword" ||
        headers["Content-Type"] !== "application/x-www-form-urlencoded") {
        statusCode += 404
        statusMessage = "Not found"
        body = "not found"
        // outputHttpResponse(statusCode, "Not found", headers, "not found");
    } else {
        //TODO Check login & pass from file to body parameters
        let file
        try {
            file = require("fs")
                .readFileSync("passwords.txt", "utf8")
                .split("\n")
                .reduce((acc, val) => {
                    acc[val.split(":")[0]] = val.split(":")[1]
                    return acc
                }, {})
        } catch (e) {
            statusCode += 505
            statusMessage = "Internal Server Error"
            body = "Internal Server Error"
        }
        let user = body.split("&").reduce((acc, val) => {
            acc[val.split("=")[0]] = val.split("=")[1]
            return acc
        }, {})
        if (file !== undefined) {
            if (Object.keys(file).includes(user["login"]) && file[user["login"]] === user["password"]) {
                statusCode += 200
                statusMessage = "correct login & password"
                body = "<h1 style=\"color:green\">FOUND</h1>"
            } else if (Object.keys(file).includes(user["login"])) {
                statusCode += 404
                statusMessage = "incorrect password"
                body = "wrong password"
            }
        }
    }
    headers["Content-Length"] = body.length
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

let http = parseTcpStringAsHttpRequest("POST /api/checkLoginAndPassword HTTP/1.1\n" +
    "Accept: */*\n" +
    "Content-Type: application/x-www-form-urlencoded\n" +
    "User-Agent: Mozilla/4.0\n" +
    "Content-Length: 35\n" +
    "\n" +
    "login=user&password=12345678\n");
processHttpRequest(http.method, http.uri, http.headers, http.body);