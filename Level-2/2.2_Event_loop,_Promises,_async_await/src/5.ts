function first(callback: (ip: string) => void): void {
    fetch("https://api.ipify.org?format=json")
        .then(res => res.json())
        .then(json => callback(json.ip));
}

let second = async () => {
    await first((ip: string) => console.log(ip));
}

second()