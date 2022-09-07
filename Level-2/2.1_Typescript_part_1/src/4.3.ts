// 4.3

// @ts-ignore
function hey(a: { name: () => string, type: string, cuteness?: number, coolness?: number }): string {
    return "hey! i'm " + a.name()
        + (a.type === "cat" ? ("cuteness: " + a.cuteness) : ("coolness: " + a.coolness))
}

hey({name: () => "roma", type: "cat", cuteness: 100})
hey({name: () => "vasya", type: "dog", coolness: 100})