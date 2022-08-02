// const express = require('express')
// const app = express()
// const database = require('./database')

// app.use(express.json());
// app.use(express.urlencoded()); //Parse URL-encoded bodies

// app.get('/posts', (req, res) => {
//     database.getPosts((error, posts) => {
//         if (error) {
//             res.send({ error: error.message })
//             return
//         }
//         res.send({posts})
//     })
// })

// app.post('/posts', (req, res) => {
//     const comment = req.body.comment
//     database.createPost(comment, (error, insertId) => {
//         if (error) {
//             res.send({ error: error.message })
//             return
//         }
//         res.send({
//             id: insertId,
//             comment
//         })
//     })
// })

// const port = process.env.PORT || 8080
// app.listen(port, () => {
//     console.log(`listening on port ${port}`)
// })