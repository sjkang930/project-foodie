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
    const [rows] = await pool.query(`SELECT * FROM posts ORDER BY id DESC;`)
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

export async function createPost(description, filename) {
    const [result] = await pool.query(`
    INSERT INTO posts (description, filename)
    VALUES(?,?)
    `, [description, filename])
    const id = result.insertId
    return getPost(id)
}

export async function createComment(comment, id) {
    let query = "UPDATE posts SET comment = :comment WHERE id = :id";
    let params = { comment: comment, id: id }
    const [result] = await database.query(query, params)
    return result
}

