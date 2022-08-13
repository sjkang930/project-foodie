import express from 'express'
import { getPosts, getPost, createComment, createPost, getComments, getAllComments, updatePost, deletePost } from './database.js'
import dotenv from 'dotenv'
import multer from 'multer'
import fs, { copyFileSync } from 'fs'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios'

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


app.get('/create', async (req, res) => {

})

app.post('/create', upload.single('image'), async (req, res) => {
    const { filename, path } = req.file
    const { description, resName } = req.body
    const image_url = `/images/${filename}`
    const post = await createPost(description, image_url, resName)
    console.log("req.body", req.body)
    console.log("req.file", req.file)
    console.log(post)
    res.send({
        description,
        image_url,
        resName
    })
})
app.delete('/delete/:post_id', async (req, res) => {
    const post_id = req.params.post_id
    const post = await getPost(post_id)
    if (!post) {
        res.status(400).send({ message: `there is no post with post_id ${post_id}` });
        return;
    }
    await deletePost(post_id);
})

app.put('/edit/:post_id', upload.single('image'), async (req, res) => {
    const post_id = req.params.post_id
    console.log(post_id)
    console.log("req.body", req.body)
    console.log("req.file", req.file)
    const { filename, path } = req.file
    const { description, resName } = req.body
    const image_url = `/images/${filename}`
    const post = await updatePost(description, `/images/${filename}`, resName, post_id)
    console.log(post)
    res.send({
        description,
        image_url,
        resName
    })
})


app.post('/restaurant', async (req, res) => {
    const { restaurantName } = req.body
    let url_api = `https://api.yelp.com/v3/businesses/search?term=${restaurantName}&latitude=49.2827&longitude=-123.1207&radius=40000`
    let headers = {
        "Authorization": `Bearer ROF0HVCZJhK3MOwM_BdaB_bIodzpNbWdhHMDsXZxF7bRg35xwwQRscs_ZJQdV7HKKonIdb5iyHpfY-sabDbugiUfBkDDg4tVymAhpAx7Rs8ratmrpPnMW3hqMtSJYnYx`,
    }
    const request = {
        headers
    }
    const data = await axios.get(url_api, request)
    const restaurants = data.data.businesses
    res.send(restaurants)
})


app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

