import aws from 'aws-sdk'
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config();
// import fs, { copyFileSync } from 'fs'
// import { PutObjectCommand, S3Client } from "@aws-sdk/client/s3";
// import path from 'path'
// import { dirname } from 'path';

// const randomeImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey
})
export function uploadFile(file) {
    let fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Key: file.filename,
        Body: fileStream
    }
    return s3.upload(uploadParams).promise()
}
export function getFileStream(fileKey) {
    const downloadParams = {
        Bucket: bucketName,
        Key: fileKey,
    }
    let fileStream = s3.getObject(downloadParams).createReadStream()
    return fileStream
}
export function listObjects() {
    const params = {
        Bucket: bucketName
    }
    return s3.listObjectsV2(params).promise()
}