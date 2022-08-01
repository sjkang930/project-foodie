const express = require('express')

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.get('/posts', (req, res) => {

})

app.post('/posts', (req, res) => {

    console.log(req.body.comment)

})

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})