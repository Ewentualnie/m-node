import express from 'express'


const port = process.env.PORT ?? 8000;
const app = express();

app.use(express.static('static'))


app.route(' /api/v1/items')
    .get(function(req, res) {
        res.send('Get');
    })
    .post(function(req, res) {
        res.send('Post');
    })
    .put(function(req, res) {
        res.send('Put');
    })
    .delete(function(req, res) {
        res.send('Delete');
    });


app.listen(port, () => console.log("server started on port: " + port))