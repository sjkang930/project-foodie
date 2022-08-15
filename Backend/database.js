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
    const [rows] = await pool.query(`SELECT * FROM posts ORDER BY post_id DESC;`)
    return rows
}

export async function getPost(post_id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM posts
        WHERE post_id =?
        `, [post_id]
    )
    return rows
}

export async function createPost(description, filename, resName) {
    const [result] = await pool.query(`
    INSERT INTO posts (description, filename, resName)
    VALUES(?,?,?)
    `, [description, filename, resName])
    const post_id = result.insertId
    return getPost(post_id)
}

export async function updatePost(description, filename, resName, post_id) {
    const query = `UPDATE posts SET description = ?, filename = ?, resName = ? WHERE post_id = ?`;
    const [result] = await pool.query(query, [description, filename, resName, post_id]);
    const post = getPost(post_id)
    return post;
}

export async function deletePost(post_id) {
    const query = `DELETE FROM posts WHERE post_id = ?`;
    const [result] = await pool.query(query, [post_id]);
    return result;
}

export async function createComment(comment, post_id) {
    const [result] = await pool.query(`
    INSERT INTO comments (comment, post_id) VALUES(?, ?)
    `, [comment, post_id])
    return result
}

export async function getComment(comment_id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM comments
        WHERE comment_id =?
        `, [comment_id]
    )
    return rows
}

export async function deleteComment(comment_id) {
    const query = `DELETE FROM comments WHERE comment_id = ?`;
    const [result] = await pool.query(query, [comment_id]);
    return result;
}

export async function getAllComments() {
    const [rows] = await pool.query(`
        SELECT * 
        FROM comments
        `,
    )
    return rows
}

export async function getComments(post_id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM comments
        WHERE post_id =?
        `, [post_id]
    )
    return rows
}



