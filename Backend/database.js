import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getPosts() {
    const [rows] = await pool.query(`SELECT * FROM posts`)
    return rows
}

export async function getPost(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM posts
        WHERE id =?
        `, [id]
    )
    return rows[0]
}

export async function createPost(comment) {
    const [result] = await pool.query(`
    INSERT INTO posts (comment)
    VALUES(?)
    `, [comment])
    const id = result.insertId
    return getPost(id)
}

