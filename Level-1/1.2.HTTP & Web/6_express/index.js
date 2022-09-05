import express from 'express'
import path from 'path'

const __dirname = path.resolve()
const port = process.env.PORT ?? 8000;
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'))


app.get('/', (req, res) => {
    res.render('index', {title: 'Main Page', active: 'main'})
})
let i = 0
app.get('/next/', (req, res) => {
    res.render('next', {title: 'Next Page', active: 'features', count: i})
    i++
})

app.listen(port, () => console.log("server started on port: " + port))