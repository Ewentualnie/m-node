let one = (url: string): Promise<string> =>
    fetch(url)
        .then(value => value.json())
        .then(value => value.ip)

let two = async (callback: (param: string) => void) => callback(await one("https://api.ipify.org?format=json"))

let callback = async (ip: string) => console.log(ip)

two(callback)
