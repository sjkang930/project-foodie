import dotenv from 'dotenv'
dotenv.config();
import fs, { copyFileSync } from 'fs'
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import path from 'path'
import { dirname } from 'path';

const randomeImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

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

//uploads a file to s3
export function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        body: fileStream,
        key: file.filename
    }
    const params = {
        Buket: bucketName,
        Key: randomeImageName(),
        body: fileStream,
        ContentType: req.file.mimetype,

    }
    const command = new PutObjectCommand(uploadParams)
    return s3.send(command)
}



//downloads a file from s3