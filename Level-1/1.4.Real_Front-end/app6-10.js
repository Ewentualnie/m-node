let hover = document.querySelector("#hover")

hover.onmouseenter = () => {
    document.querySelector("#test1").className = "red_div"
}
hover.onmouseleave = () => {
    document.querySelector("#test1").className = "hidden"
}

let selector = document.querySelector("#selector")

selector.onfocus = () => {
    document.querySelector("#test2").className = "green_div"
}
selector.onblur = () => {
    document.querySelector("#test2").className = "hidden"
}

let loadBut = document.querySelector("#load")
loadBut.onclick = () => {
    let path = document.querySelector("#input").value

    document.querySelector("#image").appendChild(createImg(path))
    document.querySelector("#image").className = "img"
}

let loadsBut = document.querySelector("#loads")
loadsBut.onclick = () => {
    document.querySelector("#inputs").value.split("\n").forEach((elem) => {
        document.querySelector("#images").appendChild(createImg(elem));
        document.querySelector("#images").className = "img"
    })
}

function createImg(path) {
    let node = document.createElement("img")
    node.src = path;
    node.width = 100;
    return node
}

let cursorPos = document.querySelector("#cursor_child")
document.addEventListener('mousemove', e => {
    cursorPos.innerHTML = `X: ${e.clientX}, Y:${ e.clientY}`;
});

























