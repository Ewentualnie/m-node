import {MongoClient, UpdateResult, WithId} from "mongodb";

const ObjectId = require("mongodb").ObjectId;
const client = new MongoClient("mongodb://root:root@localhost:27017");
const collection = client.db("mongoDb").collection("todolist");

type Element = { id: string, text: string, checked: boolean };

export async function load(): Promise<WithId<Document>[]> {
    await client.connect()
    return collection.find({}).toArray().then()
}

export async function add(element: { text: string }): Promise<typeof ObjectId> {
    await client.connect()
    return collection.insertOne({"text": element.text, "checked": false})
        .then(result => result.insertedId)
}

export async function edit(task: Element): Promise<UpdateResult> {
    await client.connect()
    return collection.updateOne({_id: ObjectId(task.id)}, {$set: {text: task.text, checked: task.checked}});
}

export async function del(task: Element): Promise<boolean> {
    await client.connect()
    return collection.deleteOne({_id: ObjectId(task.id)})
        .then(result => result.acknowledged)
}

client.connect().then(() => {
    console.log("Connect to mongoDb is success")
    client.close().then()
});