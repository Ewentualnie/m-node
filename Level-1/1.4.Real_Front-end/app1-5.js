let restore = document.getElementById("restore")
let css = document.getElementById("css")
let clear = document.getElementById("js")
let hide = document.getElementById("hide")
let hideAll = document.getElementById("hideAll")
let getForm = document.getElementById("submit")

restore.onclick = () => {
    let obj = document.getElementById("test1")
    let main = document.querySelector("#main")

    let node = createDiv()

    obj === null ? main.appendChild(node) : obj.remove() + main.appendChild(node)
}
css.onclick = () => {
    let obj = document.getElementById("test1")
    obj.style = "display: none"
}
clear.onclick = () => {
    let obj = document.getElementById("test1")
    obj.remove();
}
hide.onclick = () => {
    let obj = document.getElementById("test1")
    obj.className = "hidden"
}
hideAll.onclick = () => {
    let obj = [...document.getElementsByClassName("base")]
    for (let objElement of obj) {
        objElement.className = "hidden"
    }
}

getForm.onclick = () => {
    let selector = document.getElementById("selector").value
    let obj = document.querySelectorAll(selector)
    for (let objElement of obj) {
        objElement.classList.contains("hidden") === false ?
            objElement.classList.add('hidden') :
            objElement.classList.remove('hidden')
    }
}

function createDiv() {
    let node = document.createElement("div")
    node.className = "base";
    node.id = "test1"
    node.innerText = "Created!!!"
    return node
}


function alertHello(element) {
    alert("hello")
    element.setAttribute("onclick","deleteDiv(this)")
}
function deleteDiv (element) {
    element.remove()
}