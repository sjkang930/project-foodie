import express from 'express'
import { getPosts, getPost, createComment, createPost, getComments, getAllComments } from './database.js'
import dotenv from 'dotenv'
import multer from 'multer'
import fs, { copyFileSync } from 'fs'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
dotenv.config();
app.use(express.json());

const upload = multer({ dest: 'uploads/' })

app.get('/posts', async (req, res) => {
    const posts = await getPosts()
    res.send(posts)
})

app.get('/comments', async (req, res) => {
    const comments = await getAllComments()
    console.log("comments", comments)
    res.send(comments)
})

app.post('/posts', async (req, res) => {
    const { comment, postId } = req.body
    const post = await createComment(comment, postId)
    res.send(post)
})

app.get('/images/:filename', (req, res) => {
    const filename = req.params.filename
    const readStream = fs.createReadStream(path.join(__dirname, 'uploads', filename))
    readStream.pipe(res)
})


app.get('create', async (req, res) => {

})

app.post('/create', upload.single('image'), async (req, res) => {
    const { filename, path } = req.file
    const description = req.body.description
    const image_url = `/images/${filename}`
    const post = await createPost(description, image_url)
    console.log("req.body", req.body)
    console.log("req.file", req.file)
    console.log(post)
    res.send({
        description,
        image_url
    })
})

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

