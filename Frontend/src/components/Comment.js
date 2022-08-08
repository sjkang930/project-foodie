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
            setComment_id(commentIdArray.length === 0 ? 1 : commentIdArray[commentIdArray.length - 1] + 1)
        })()
    }, [])

    const submit = async (event) => {
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
        await axios.post('/posts', { comment, postId })
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
                    <button className="comment_post" onClick={async () => {
                        setPostId(post_id)
                        // const data = await axios.get("https://api.yelp.com/v3/businesses/search")
                        // console.log(data)
                        // .then((result)=> {
                        //     console.log(result)
                        // })
                        // .catch((erro)=>{
                        //     console.log(err)
                        // })
                        // let latitude = req.query.latitude
                        // let longitude = req.query.longitude
                        // let url = `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&radius=40000`
                        // let options = {
                        //     'headers': {
                        //         'x-api-key': 'I4VPC2nHPKjXgSkG2406XTkcgKtB42TNNBa_WF38qTdb9lERIdrZeqkkYsdwNgfooicoEbw_BMg6EtISWqQ2ogJdjQmp4sITejk6FRz8vYSQd79hep_YC9Fj68SJYnYx',
                        //         'Authorization': 'Bearer I4VPC2nHPKjXgSkG2406XTkcgKtB42TNNBa_WF38qTdb9lERIdrZeqkkYsdwNgfooicoEbw_BMg6EtISWqQ2ogJdjQmp4sITejk6FRz8vYSQd79hep_YC9Fj68SJYnYx'
                        //     }
                        // };
                    }}>Post</button>
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