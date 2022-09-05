let lang = document.querySelector("#cursor_child")
lang.textContent = window.navigator.language
navigator.geolocation.getCurrentPosition(success =>
    lang.textContent += ` Ш: ${success.coords.latitude}, Д: ${success.coords.longitude}`)

document.getElementById("input1").value = getLocal("input1")
document.getElementById("input2").value = getCookies("input2")
document.getElementById("input3").value = getSession("input3")

function storeLocal(id) {
    localStorage.setItem(id, document.getElementById(id).value);
}

function storeCookies(id) {
    document.cookie = id + "=" + document.getElementById(id).value + "; max-age=86400; SameSite"
}

function storeSession(id) {
    sessionStorage.setItem(id, document.getElementById(id).value);
}

function getLocal(id) {
    return localStorage.getItem(id);
}

function getCookies(id) {
    return document.cookie
        .split(";")
        .reduce((acc, val) => {
            acc[val.split("=")[0]] = val.split("=")[1]
            return acc
        }, {})[id]
}

function getSession(id) {
    return sessionStorage.getItem(id);
}

function scrollUp() {
    document.documentElement.scrollTop = 0;
}

window.onscroll = () => {
    let buttonStyle = document.getElementById("scrollBtn");
    if (document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - document.documentElement.clientHeight) {
        buttonStyle.style.display = "block";
    } else buttonStyle.style.display = "none";
};

document.getElementById("out").onclick = () => funk("outer")

document.getElementById("inner").onclick = () => funk("inner")

let funk = (text) => {
    alert(text + " block")
    event.stopPropagation();
}

document.querySelector("#hide_screen").onclick = () => {
    document.body.style.overflow = "hidden"
    document.querySelector("#block_screen").className = "block"
}

function hide(element) {
    document.body.style.overflow = "visible"
    element.className = "hidden"
}



let form = document.getElementById('form-group');

form.ondragover = () => {
    document.getElementById('label').style.border = '2px solid #0d6efd';
};

form.ondragleave = () => {
    document.getElementById('label').style.border = '2px dashed #0d6efd';
};

form.ondrop = (event) => {
    document.getElementById('label').style.border = '2px solid #0d6efd';
    let title = document.querySelector('.title');
    let files  = event.dataTransfer;

    if (files.length === 1) {
        title.innerText = files[0].name;
    } else {
        title.innerText = `Download ${files.length} files`;
    }
    title.style.color = '#0d6efd';
    document.querySelector('.label i').style.color = '#0d6efd';
};