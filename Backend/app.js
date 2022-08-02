import express from 'express'
import { getPosts, getPost, createComment, createPost } from './database.js'
import dotenv from 'dotenv'
import multer from 'multer'

const app = express();
dotenv.config();
app.use(express.json());

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
    const post = await createComment(comment, id)
    res.send(post)
})

app.get('create', async (req, res) => {

})

app.post('/create', upload.single('image'), async (req, res) => {
    const { filename, path } = req.file
    const description = req.body.description
    const image_url = `/uploads/${filename}`
    const post = await createPost(description, image_url)
    console.log("req.body", req.body)
    console.log("req.file", req.file)
    console.log(post)
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

