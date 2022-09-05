//
//
//
//
function getCSV(str) {
    let cities = str
        .split(("\n"))
        .filter(val => val.length > 0 && val.charAt(0) !== "#")
        .map(element => element.split(","))
        .map(element => ({x: element[0], y: element[1], name: element[2].trim(), population: element[3]}))
        .sort((a, b) => +b.population - +a.population)
        .slice(0, 10)
        .reduce(
            (accumulator, currentElement, i) => {
                accumulator[currentElement.name] = {
                    population: currentElement.population,
                    rating: i + 1
                }
                return accumulator;
            }, {})
    // return cities
    return (toReplace) => {
        Object.keys(cities).forEach(element => {
            toReplace = toReplace.replace(element,
                `${element} (${cities[element].rating} місце в ТОП-10 найбільших міст України, населення ${cities[element].population})`)
        })
        return toReplace;
    }


}

let text = "44.38,34.33,Алушта ,31440,\n" +
    "49.46,30.17,Біла Це,200131,\n" +
    "49.54,28.49,Бердичі,87575,#некоммент\n" +
    "\n" +
    "#\n" +
    "46.49,36.58,#Бердян,121692,\n" +
    "49.15,28.41,Вінниця,356665,\n" +
    "#45.40,34.29,Джанкой,43343,\n" +
    "\n" +
    "# в этом файле три строки-коммента :)\n" +
    "44.38,34.33,Але-ооп,31440,\n" +
    "49.46,30.17,Белочка,200131,\n" +
    "49.54,28.49,Бублік ,87575,#некоммент\n" +
    "\n" +
    "#\n" +
    "46.49,36.58,Кисіль ,121692,\n" +
    "49.15,28.41,Вінник ,356665,\n" +
    "45.40,34.29,Джанкой,43343,\n" +
    "\n" +
    "# в этом файле три строки-коммента :)"

let info = "Мабуть, немає українця, який не зможе відповісти на питання «що подивитись у Києв?»." +
    " Золоті ворота, Батьківщина-мати, Вінниця – про ці місця, певно, знають навіть діти. " +
    "Іноді здається, що для справжнього Вінник зі столицею на вистачить і цілого Бублік – аж стільки тут цікавинок!" +
    " Але це не Джанкой з тисячолітньою історією, воно має сучасне обличчя." +
    " Високий туристичний сезон в столиці припадає на знамените цвітіння Біла Це, помилуватись яким приїжджають й іноземці."
let someCities = "Тут Вінниця , після неї йде інше місто - Вінник . а взагалі Кисіль всьому голова, бо перед Джанкой треба зупинка, але є ще Алушта "
let somethings = "Вінниця Вінник який-сь текст Біла Це Белочка #Бердян Кисіль Бердичі Бублік Джанкой Алушта"
let funk = getCSV(text)
// console.log(funk)
// console.log(funk(info))
// console.log(funk(someCities))
console.log(funk(somethings))