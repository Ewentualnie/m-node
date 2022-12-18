import express, {Express} from 'express'
import cors from 'cors'

const apiV1 = require('../routes/items.js');
const apiV2 = require('../routes/items2.js');
const port = process.env.PORT ?? 3005;
const app: Express = express();
const session = require('express-session');
const FileStore = require('session-file-store')(session);

app.use(express.static('static'));
app.use(express.json());
app.use(cors());

app.use(session({
    store: new FileStore({}),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));
app.use('/api/v1', apiV1);
app.use('/api/v2', apiV2)

app.listen(port, () => console.log("server started on port: " + port))
