import express from 'express'
import { getPosts, getPost, createComment, createPost, getComments, getAllComments, updatePost, deletePost, deleteComment } from './database.js'
import dotenv from 'dotenv'
import multer from 'multer'
import fs, { copyFileSync } from 'fs'
import * as path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios'
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from 'crypto'

const bucketName = process.env.AWS_BUCKET_NAME
const bucketRegion = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAcessKey = process.env.AWS_SECRET_KEY


const s3 = new S3Client({
    credentials: {
        accessKeyId,
        secretAcessKey,
    },
    region: bucketRegion
})

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
dotenv.config();
app.use(express.json());

const storage = multer.memoryStorage()
const upload = multer({ dest: 'uploads/' })

app.get('/posts', async (req, res) => {
    const posts = await getPosts()
    res.send(posts)
})

app.get('/comments', async (req, res) => {
    const comments = await getAllComments()
    res.send(comments)
})

app.delete('/comments/:id', async (req, res) => {
    const comment_id = req.params.id
    const comment = await getComments(comment_id)
    if (!comment) {
        res.status(400).send({ message: `there is no post with post_id ${comment_id}` });
        return;
    }
    await deleteComment(comment_id);
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

app.post('/create', upload.single('image'), async (req, res) => {
    const { filename } = req.file
    const { description, resName, place } = req.body
    const image_url = `/images/${filename}`
    // const result = await uploadFile(req.file)
    // console.log("result", result)
    const latitude = place.substring(0, place.indexOf(','))
    const longitude = place.substring(place.indexOf(',') + 1, place.lastIndexOf(''))
    const post = await createPost(description, image_url, resName, latitude, longitude)
    console.log("req.body", req.body)
    const params = {
        Buket: bucketName,
        Key: req.file.originalname,
        body: req.file.filename,
        ContentType: req.file.mimetype,

    }

    const command = new PutObjectCommand(params)
    console.log("s3", s3.middlewareStack)
    const middlewareStack = s3.middlewareStack
    const response = middlewareStack.add(command)
    console.log("response", response)

    res.send({
        description,
        image_url,
        resName,
        latitude,
        longitude
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
    const { filename, path } = req.file
    const { description, resName, place } = req.body
    const latitude = place.substring(0, place.indexOf(','))
    const longitude = place.substring(place.indexOf(',') + 1, place.lastIndexOf(''))
    const image_url = `/images/${filename}`
    const post = await updatePost(description, `/images/${filename}`, resName, latitude, longitude, post_id)
    res.send({
        description,
        image_url,
        resName,
        latitude,
        longitude
    })
})

app.post('/restaurant', async (req, res) => {
    const { restaurantName, place } = req.body
    const latitude = place.substring(0, place.indexOf(','))
    const longitude = place.substring(place.indexOf(',') + 1, place.lastIndexOf(''))
    let url_api = `https://api.yelp.com/v3/businesses/search?term=${restaurantName}&latitude=${latitude}&longitude=${longitude}&radius=40000`
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
app.post('/mapIcon/:post_id', async (req, res) => {
    const post_id = req.params.post_id
    const [post] = await getPost(post_id)
    const { resName, longitude, latitude } = post
    let url_api = `https://api.yelp.com/v3/businesses/search?term=${resName}&latitude=${latitude}&longitude=${longitude}&radius=40000`
    let headers = {
        "Authorization": `Bearer ROF0HVCZJhK3MOwM_BdaB_bIodzpNbWdhHMDsXZxF7bRg35xwwQRscs_ZJQdV7HKKonIdb5iyHpfY-sabDbugiUfBkDDg4tVymAhpAx7Rs8ratmrpPnMW3hqMtSJYnYx`,
    }
    const request = {
        headers
    }
    const data = await axios.get(url_api, request)
    const [restaurants] = data.data.businesses
    console.log("restaurants.coordinates", restaurants.coordinates)
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

