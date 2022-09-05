//
//
//
//
function processHttpRequest(method, uri, headers, body) {
    if (uri === "/") {
        try {
            return require("fs").readFileSync("index1-5.html", "utf8")
        } catch (e) {
            return "error 404"
        }
    } else if (uri === "/file.txt") {
        if (headers.Host.split(".")[0] === "student") {
            try {
                return require("fs").readFileSync(headers.Host.split(".")[0] + uri, "utf8")
            } catch (e) {
                return "error 404"
            }
        } else if (headers.Host.split(".")[0] === "another") {
            try {
                return require("fs").readFileSync(headers.Host.split(".")[0] + uri, "utf8")
            } catch (e) {
                return "error 404"
            }
        } else {
            try {
                return require("fs").readFileSync("else" + uri, "utf8")
            } catch (e) {
                return "error 404"
            }
        }
    } else {
        return "error 403"
    }
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

let http = parseTcpStringAsHttpRequest("POST / HTTP/1.1\n" +
    "Accept: */*\n" +
    "Content-Type: application/x-www-form-urlencoded\n" +
    "User-Agent: Mozilla/4.0\n" +
    "Content-Length: 35\n" +
    "\n" +
    "login=user&password=12345678\n");

console.log(processHttpRequest(http.method, http.uri, http.headers, http.body));