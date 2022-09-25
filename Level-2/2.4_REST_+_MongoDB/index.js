import express from 'express'
import path from 'path'

const __dirname = path.resolve()
const port = process.env.PORT ?? 8000;
const app = express()

app.use(express.static('static'))
app.listen(port, () => console.log("server started on port: " + port))