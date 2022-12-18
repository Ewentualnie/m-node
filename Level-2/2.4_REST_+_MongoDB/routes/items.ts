import express, {Request, Response} from "express";
import {load, add, edit, del} from './mongo'

const router = express.Router();
const path: string = '/items';
const ok: { ok: boolean } = {ok: true}
router.get(path, async (req: Request, res: Response) => res.end(JSON.stringify({items: await load()})))
    .post(path, async (req: Request, res: Response) => res.end(JSON.stringify({id: await add(req.body)})))
    .put(path, async (req: Request, res: Response) => res.end(JSON.stringify(await edit(req.body))))
    .delete(path, async (req: Request, res: Response) => res.send(JSON.stringify({ok: await del(req.body)})))
    .post('/login', (req: Request, res: Response) => res.send(JSON.stringify(ok)))
    .post('/logout', (req: Request, res: Response) => res.send(JSON.stringify(ok)))
    .post('/register', (req: Request, res: Response) => res.send(JSON.stringify(ok)));
module.exports = router;