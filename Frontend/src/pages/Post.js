import React, { useState, useEffect } from "react";
import axios from 'axios'

const Post = () => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [count, setCount] = useState(0);
    const [isLike, setIsLike] = useState(false);
    const [posts, setPosts] = useState([])

    useEffect(() => {
        (async () => {
            const result = await axios.get('/posts')
            setPosts(result.data)
        })()
    }, [])

    const submit = async (event) => {
        event.preventDefault()
        setComments([...comments, comment])
        setComment("")
        setCount(count + 1)
        const result = await axios.post('/posts', { comment })
        setPosts(result.data, ...posts)
    }
    return (
        <div className="posts">


            {posts.map(post => (
                <div className="post" >



                    <> <section className="post_head">
                        <div className="left_col">
                            <div className="profile">
                                <img src="/icons/smantha.svg" />
                            </div>
                            <div>
                                <div className="user_name">
                                    suji kang
                                </div>
                                <div className="location">
                                    @mumu kitchen
                                </div>
                            </div>
                        </div>
                        <div className="right_col">
                            <div className="more_info">
                                <img src="/icons/png.png" />
                            </div>
                        </div>
                    </section>

                        <section className="picture">
                            <div >
                                <img className="user_pic" src={post.filename} />
                            </div>
                        </section>

                        <section>
                            <div className="second_icon">
                                <div className="left_icons">
                                    <div className="likes">
                                        <img onClick={() => setIsLike(!isLike)} src={isLike ? "/icons/like.svg" : "/icons/heart.svg"} />
                                    </div>
                                    <div className="message">
                                        <img src="/icons/message.svg" />
                                    </div>
                                    <div className="share">
                                        <img src="/icons/share.svg" />
                                    </div>
                                </div>

                                <div className="right_icon">
                                    <img src="/icons/map.svg" width="39" />
                                </div>
                            </div>
                        </section>

                        <section className="user_name_description">
                            <div className="user_name">
                                suji kang
                            </div>
                            <div className="description">
                                {post.description}
                            </div>
                        </section>

                        <section className="comments">
                            <div className="total_comments">
                                see all {count + posts.length} comments
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
                                <button className="comment_post">Post</button>
                            </form>

                            <div>
                                <ul>
                                    {posts.map(it => <li key={it.id} className="comment_list">{it.comment}</li>)}
                                    {comments.map((comment, index) => <li key={index} className="comment_list">{comment}</li>
                                    )}
                                </ul>
                            </div>
                        </section></>
                </div >
                ))}
        </div>
    );



}


export default Post;