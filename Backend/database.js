import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function createUser(firstName, lastName, email, password) {
    const [result] = await pool.query(`
    INSERT INTO users(firstName, lastName, email, password)
    VALUES(?,?,?,?)
    `, [firstName, lastName, email, password])
    const user_id = result.insertId
    return getUser(user_id)
}

export async function getUsers() {
    const [rows] = await pool.query(`SELECT * FROM users`)
    return rows
}

export async function getUser(user_id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM users 
    WHERE user_id = ?
    `, [user_id]
    )
    return rows[0]
}
export async function getUserByEmail(email) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM users 
    WHERE email = ?
    `, [email]
    )
    return rows[0]
}

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

export async function createPost(user_id, description, filename, resName, latitude, longitude) {
    const [result] = await pool.query(`
    INSERT INTO posts(user_id, description, filename, resName, latitude, longitude)
    VALUES(?,?,?,?,?,?)
    `, [user_id, description, filename, resName, latitude, longitude])
    const post_id = result.insertId
    return getPost(post_id)
}

export async function updatePost(description, filename, resName, latitude, longitude, post_id,) {
    const query = `UPDATE posts SET description = ?, filename = ?, resName = ?, latitude = ?, longitude =? WHERE post_id = ? `;
    const [result] = await pool.query(query, [description, filename, resName, latitude, longitude, post_id]);
    const post = getPost(post_id)
    return post;
}

export async function deletePost(post_id) {
    const query = `DELETE FROM posts WHERE post_id = ? `;
    const [result] = await pool.query(query, [post_id]);
    return result;
}

export async function createComment(comment, post_id, user_id) {
    const [result] = await pool.query(`
    INSERT INTO comments(comment, post_id, user_id) VALUES(?, ?, ?)
        `, [comment, post_id, user_id])
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
    const query = `DELETE FROM comments WHERE comment_id = ? `;
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



