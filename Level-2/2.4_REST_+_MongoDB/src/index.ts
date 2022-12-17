import express, {Express, Request, Response} from 'express'
import cors from 'cors'
import {Collection, MongoClient, UpdateResult, WithId} from "mongodb";

const ObjectId = require("mongodb").ObjectId
const port = process.env.PORT ?? 3005;
const app: Express = express();
const client: MongoClient = new MongoClient("mongodb://root:root@localhost:27017");
const collection: Collection<Document> = client.db("mongoDb").collection("todolist")
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const ok: { ok: boolean } = {ok: true}

type Element = { id: string, text: string, checked: boolean };

app.use(express.static('static'));
app.use(express.json());
app.use(cors());

app.use(session({
    store: new FileStore({}),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));

app.route('/api/v1/items')
    .get(async (req: Request, res: Response) => {
        res.end(JSON.stringify({items: await loadDb()}));
        await client.close();
    })
    .post(async (req: Request, res: Response) => {
        res.end(JSON.stringify({id: await addTask(req.body)}));
        await client.close();
    })
    .put(async (req: Request, res: Response) => {
        res.end(JSON.stringify(await editTask(req.body)));
        await client.close();
    })
    .delete(async (req: Request, res: Response) => {
        res.send(JSON.stringify({ok: await deleteTask(req.body)}));
        await client.close();
    });
app.route('/api/v1/login')
    .post((req: Request, res: Response) => {
        console.log(req.params)
        res.send(JSON.stringify(ok));
    });
app.route('/api/v1/logout')
    .post((req: Request, res: Response) => {
        res.send(JSON.stringify(ok));
    });
app.route('/api/v1/register')
    .post((req: Request, res: Response) => {
        res.send(JSON.stringify(ok));
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

client.connect().then(() => {
    console.log("connected to mongoDb")
    client.close().then()
})

app.listen(port, () => console.log("server started on port: " + port))
