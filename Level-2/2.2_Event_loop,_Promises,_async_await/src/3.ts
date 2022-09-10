const url: string = "https://random-data-api.com/api/name/random_name";

async function getName(url: string): Promise<string> {
    let response = await fetch(url);
    let res = await response.json();
    return res.name
}

async function printNames1(): Promise<string[]> {
    return  await Promise.all([
        getName(url),
        getName(url),
        getName(url)
    ])
}

async function printNames2(): Promise<string[]> {
    let result: string[] = [];
    for (let i = 0; i < 3; i++) {
        await getName(url).then(value => result.push(value))
    }
    return result
}

function printNames3() {
    let names: string[] = []
    let promises: Promise<Response>[] = [];
    for (let i = 0; i < 3; i++) {
        promises[i] = fetch(url);
    }
    for (let i = 0; i < promises.length; i++) {
        let res: Promise<Response> = promises[i]
        res.then(value => value.json()).then(value => names.push(value.name))
    }
    return names;
}

// let result1 = printNames1();
// let result2 = printNames2();
// let result3 = printNames3();
// setTimeout(() => {
//     console.log(result1);
//     console.log(result2);
//     console.log(result3)
// }, 2000);