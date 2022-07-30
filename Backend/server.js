const express = require('express')

const app = express()

app.use(express.json());

app.get('/posts', (req, res) => {

})

app.post('/posts', (req, res) => {
    const { comment } = req.body
    console.log(req.body)
    console.log(comment)
})

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})