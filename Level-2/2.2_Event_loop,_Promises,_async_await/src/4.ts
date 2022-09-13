const userUrl: string = "https://random-data-api.com/api/users/random_user";

let getUser1 = (url: string): Promise<Record<string, string>> => fetch(url).then(res => res.json())

let getFemale1 = (url: string, i: number = 1): Promise<Record<string, string>> => {
    let user: Promise<Record<string, string>> = getUser1(url)
    return user.then(value => {
        if (value.gender !== "Female") {
            console.log("call getFemale1 counter: " + i++)
            return getFemale1(url, i)
        } else
            return user;
    })
}

let logUser1 = (url: string) => {
    getFemale1(url).then(value => console.log("Result of getFemale1 is: " + value.first_name + " " + value.gender))
}


logUser1(userUrl)

let getUser2 = async (url: string): Promise<Record<string, string>> => {
    return await (await fetch(url)).json()
}

async function getFemale2(url: string, i: number = 1): Promise<Record<string, string>> {
    let user: Record<string, string> = await getUser2(url);
    if (user.gender !== "Female") {
        console.log("call getFemale2 counter: " + i++)
        return getFemale2(url, i)
    } else
        return user;
}

async function logUser2(url: string) {
    let res: Record<string, string> = await getFemale2(url);
    console.log("Result of getFemale2 is: " + res.first_name + " " + res.gender);
}

logUser2(userUrl)

