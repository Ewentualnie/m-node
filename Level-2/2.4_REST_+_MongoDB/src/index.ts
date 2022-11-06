import express from 'express'
import cors from 'cors'
import * as fs from "fs";


const port = process.env.PORT ?? 3005;
const app = express();

app.use(express.static('static'))
app.use(cors())

let dataBase: any = JSON.parse(fs.readFileSync("dataBase.json", "utf8"));

app.use(express.json());

app.route('/api/v1/items')
    .get(function (req, res) {
        res.end(JSON.stringify({items: dataBase}));
        saveToDB();
    })
    .post(function (req, res) {
        res.end(JSON.stringify({id: addTask(req.body.text)}));
        saveToDB();
    })
    .put(function (req, res) {
        res.end(JSON.stringify(editTask(req.body)));
        saveToDB();
    })
    .delete(function (req, res) {
        res.send(JSON.stringify(deleteTask(req.body)));
        saveToDB();
    });

function saveToDB() {
    fs.writeFileSync("dataBase.json", JSON.stringify(dataBase));
}

function addTask(text: string): number {
    let element = {
        id: dataBase.length == 0 ? 1 : dataBase[dataBase.length - 1].id + 1,
        text: text,
        checked: false
    }
    dataBase.push(element);
    return element.id;
}

function editTask(newTask: { id: number, text: string, checked: boolean }): { id: number, text: string, checked: boolean } {
    let task = dataBase[newTask.id - 1]
    task.text = newTask.text;
    task.checked = newTask.checked;
    return task;
}

function deleteTask(req: { id: number }): { ok: boolean } {
    dataBase.splice(findTaskById(req), 1)
    return {ok: true};
}

function findTaskById(req: { id: number }): number {
    return dataBase.find((el: { id: number }, index: number) => {
        if (el.id == req.id) {
            return index;
        }
    })
}

app.listen(port, () => console.log("server started on port: " + port))