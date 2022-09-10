// @ts-ignore
async function getIp(url: string):Promise<string> {
    let response = await fetch(url);

    if (response.ok) {
        let json: { ip: string } = await response.json();
        return json.ip;
    } else {
        return "Ошибка HTTP: " + response.status;
    }
}

async function answer() {
    let ip = await getIp("https://api.ipify.org?format=json");
    console.log(ip);
}

answer()
