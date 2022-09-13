function one(url: string): Promise<string> {
    return fetch(url).then(value => value.json().then(value => value.ip));
}

async function two(ip: string, callback: (param?: string) => Promise<string>) {
    return await callback(ip);
}

async function t() {
    // console.log(await two("https://api.ipify.org?format=json", one))
}

t()
