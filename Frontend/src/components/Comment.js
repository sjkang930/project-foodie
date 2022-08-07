// import React from 'react';
import React, { useState, useEffect } from "react";
import axios from 'axios'

const Comment = ({ post_id }) => {

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [count, setCount] = useState(0);
    const [postId, setPostId] = useState("");
    const [comment_id, setComment_id] = useState("")

    useEffect(() => {
        (async () => {
            const result = await axios.get('/comments')
            const commentIdArray = result.data.map(it => it.comment_id)
            setComments(result.data)
            console.log(commentIdArray)
            setComment_id(commentIdArray.length === 0 ? 1 : commentIdArray[commentIdArray.length - 1] + 1)
        })()
    }, [])


    const submit = async (event) => {
        console.log(comment_id)
        event.preventDefault()
        const newData = {
            comment,
            comment_id,
            post_id
        }
        setComment_id(comment_id + 1)
        setComments([...comments, newData])
        setComment("")
        setCount(count + 1)
        const result = await axios.post('/posts', { comment, postId })
    }

    return (
        <div className="Comment">
            <section className="comments">
                <div className="total_comments">
                    see all {comments.filter(comment => comment.post_id === post_id).length} comments
                </div>
                <form className="comment_form" onSubmit={submit}>
                    <input
                        className="input_comments"
                        placeholder="Add a Comment..."
                        value={comment}
                        onChange={(e) => {
                            setComment(e.target.value);
                        }}
                        type="text" />
                    <button className="comment_post" onClick={() => setPostId(post_id)}>Post</button>
                </form>
                <div>
                    <ul>
                        {comments.map(it => <li key={it.comment_id} className="comment_list">{it.post_id === post_id ? it.comment : " "}</li>)}

                    </ul>
                </div>
            </section>
        </div>


    )
}
export default Comment;