import express, {Request, Response} from "express";
import {getTasks, addTask, editTask, deleteTask} from "../controllers/dbcontroller";

const router = express.Router();
const path: string = '/items';
const ok: { ok: boolean } = {ok: true}
router.get(path, getTasks)
    .post(path, addTask)
    .put(path, editTask)
    .delete(path, deleteTask)
    .post('/login', (req: Request, res: Response) => res.send(JSON.stringify(ok)))
    .post('/logout', (req: Request, res: Response) => res.send(JSON.stringify(ok)))
    .post('/register', (req: Request, res: Response) => res.send(JSON.stringify(ok)));
export default router;