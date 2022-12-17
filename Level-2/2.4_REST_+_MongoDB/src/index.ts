import express, {Express, Request, Response} from 'express'
import cors from 'cors'
let items = require('../routes/items.js');

const port = process.env.PORT ?? 3005;
const app: Express = express();
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const ok: { ok: boolean } = {ok: true}


app.use(express.static('static'));
app.use(express.json());
app.use(cors());

app.use(session({
    store: new FileStore({}),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));
app.use('/api/v1/items', items);

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
app.listen(port, () => console.log("server started on port: " + port))
