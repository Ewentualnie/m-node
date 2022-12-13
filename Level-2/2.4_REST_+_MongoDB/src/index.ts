import express, {Express} from 'express'
import cors from 'cors'
import {MongoClient, UpdateResult, WithId} from "mongodb";

const ObjectId = require("mongodb").ObjectId
const port = process.env.PORT ?? 3005;
const app: Express = express();
const client = new MongoClient("mongodb://root:root@localhost:27017");
const collection = client.db("mongoDb").collection("todolist")

type Element = { id: string, text: string, checked: boolean };

app.use(express.static('static'));
app.use(express.json());
app.use(cors());

app.route('/api/v1/items')
    .get(async (req, res) => {
        res.end(JSON.stringify({items: await loadDb()}));
        await client.close();
    })
    .post(async (req, res) => {
        res.end(JSON.stringify({id: await addTask(req.body)}));
        await client.close();
    })
    .put(async (req, res) => {
        res.end(JSON.stringify(await editTask(req.body)));
        await client.close();
    })
    .delete(async (req, res) => {
        res.send(JSON.stringify({ok: await deleteTask(req.body)}));
        await client.close();
    });

async function loadDb(): Promise<WithId<Document>[]> {
    await client.connect()
    return collection.find({}).toArray().then()
}

async function addTask(element: { text: string }): Promise<typeof ObjectId> {
    await client.connect()
    return collection.insertOne({"text": element.text, "checked": false})
        .then(result => result.insertedId)
}

async function editTask(task: Element): Promise<UpdateResult> {
    await client.connect()
    return collection.updateOne({_id: ObjectId(task.id)}, {$set: {text: task.text, checked: task.checked}});
}

async function deleteTask(task: Element): Promise<boolean> {
    await client.connect()
    return collection.deleteOne({_id: ObjectId(task.id)})
        .then(result => result.acknowledged)
}

client.connect().then(() => console.log("connect to mongoDb is success"))
app.listen(port, () => console.log("server started on port: " + port))