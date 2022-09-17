// 1.

function getFirstWord(a: string): number {
    return a.split(/ +/)[0].length;
}