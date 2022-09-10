// @ts-ignore
async function getIp(url: string) {
    let response = await fetch(url);

    if (response.ok) {
        let json: { ip: string } = await response.json();
        console.log(json.ip);
    } else {
        console.log("Ошибка HTTP: " + response.status);
    }
}

getIp("https://api.ipify.org?format=json");