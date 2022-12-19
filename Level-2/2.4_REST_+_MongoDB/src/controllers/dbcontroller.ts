import {load, add, edit, del} from '../mongo.js'
import {Request, Response} from "express";

export async function getTasks(req: Request, res: Response) {
    res.end(JSON.stringify({items: await load()}))
}

export async function addTask(req: Request, res: Response) {
    res.end(JSON.stringify({id: await add(req.body)}))
}

export async function editTask(req: Request, res: Response) {
    res.end(JSON.stringify(await edit(req.body)))
}

export async function deleteTask(req: Request, res: Response) {
    res.send(JSON.stringify({ok: await del(req.body)}))
}