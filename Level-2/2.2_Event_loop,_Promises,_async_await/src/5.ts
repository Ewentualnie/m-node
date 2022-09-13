function one(url: string): Promise<string> {
    return fetch(url).then(value => value.json().then(value => value.ip));
}

function k(x: string) {
    return x
}

async function two(ip: string, callback: (param: string) => Promise<string>) {
    return await callback(ip);
}

async function t() {
    console.log(await two("https://api.ipify.org?format=json", one))
    // console.log(await two("https://api.ipify.org?format=json", k))
}

// t()
