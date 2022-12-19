import express, {Request, Response} from "express";
import {getTasks, addTask, editTask, deleteTask} from "../controllers/dbcontroller";

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
            await getTasks(req, res)
            break;
        }
        case ('createItem'): {
            await addTask(req, res)
            break;
        }
        case ('editItem'): {
            await editTask(req, res)
            break;
        }
        case ('deleteItem'): {
            await deleteTask(req, res)
            break;
        }
    }
})
export default router;