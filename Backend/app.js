import express from 'express'
import { getPosts, getPost, createComment, createPost, getComments, getAllComments } from './database.js'
import dotenv from 'dotenv'
import multer from 'multer'
import fs from 'fs'
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
    const data = await axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=49.2835&lon=-123.1153&units=metric&exclude=alerts,minutely,hourly&appid=4cbef8d14595f0b934423873f451a110")
    console.log(data)
    res.send(posts, data)
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

app.post('/restaurant', async (req, res) => {
    const { restaurantName } = req.body
    console.log(restaurantName)
    let url_api = `https://api.yelp.com/v3/autocomplete?text=${restaurantName}&latitude=49.2827&longitude=-123.1207`
    let headers = {
        "Authorization": `Bearer ROF0HVCZJhK3MOwM_BdaB_bIodzpNbWdhHMDsXZxF7bRg35xwwQRscs_ZJQdV7HKKonIdb5iyHpfY-sabDbugiUfBkDDg4tVymAhpAx7Rs8ratmrpPnMW3hqMtSJYnYx`,
    }
    const request = {
        headers
    }
    const data = await axios.get(url_api, request)
    const restaurants = data.data.businesses
    const restaurant_name = restaurants.map(restaurant => restaurant.name)
    res.send(restaurant_name)
})

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

