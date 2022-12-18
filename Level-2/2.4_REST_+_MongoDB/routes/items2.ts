import express, {Request, Response} from "express";
import {load, add, edit, del} from './mongo'

const router = express.Router();
const path: string = '/router';

const ok: { ok: boolean } = {ok: true}

router.all(path, async (req: Request, res: Response) => {
    switch (req.query.action) {
        case ('login'): {
            res.send(JSON.stringify(ok));
            break;
        }
        case ('logout'): {
            res.send(JSON.stringify(ok));
            break;
        }
        case ('register'): {
            res.send(JSON.stringify(ok));
            break;
        }
        case ('getItems'): {
            res.end(JSON.stringify({items: await load()}));
            break;
        }
        case ('addItem'): {
            res.end(JSON.stringify({id: await add(req.body)}));
            break;
        }
        case ('editItem'): {
            res.end(JSON.stringify(await edit(req.body)));
            break;
        }
        case ('deleteItem'): {
            res.send(JSON.stringify({ok: await del(req.body)}));
            break;
        }
    }
})
module.exports = router;