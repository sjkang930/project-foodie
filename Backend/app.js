import express from 'express'
import { getPosts, getPost, createPost } from './database.js'
import dotenv from 'dotenv'
import multer from 'multer'

const app = express()
dotenv.config()
app.use(express.json());

const storage = multer.memoryStorage()
const upload = multer({ dest: 'uploads/' })

app.get('/posts', async (req, res) => {
    const posts = await getPosts()
    res.send(posts)
})
app.get('/posts/:id', async (req, res) => {
    const id = req.params.id
    const post = await getPost(id)
    res.send(post)
})

app.post('/posts', async (req, res) => {
    const { comment } = req.body
    const post = await createPost(comment)
    res.send(post)
})
app.get('create', async (req, res) => {

})

app.post('/create', upload.single('image'), async (req, res) => {
    const { fieldname, path } = req.file
    const description = req.body.description
    console.log("req.body", req.body)
    console.log("req.file", req.file)
    res.send("jjj")

})

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

