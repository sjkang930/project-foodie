import React, { useState, useEffect } from "react";
import axios from 'axios'
import Comment from "../components/Comment";
import MoreButtons from "../components/MoreButtons";
import Edit from "./Edit";
import Head from "../components/Head";

const Post = ({ isEdit, setIsEdit }) => {
    const [isLike, setIsLike] = useState(false);
    const [posts, setPosts] = useState([]);

    const [newPost, setNewPost] = useState("")

    useEffect(() => {
        (async () => {
            const result = await axios.get('/posts')
            setPosts(result.data)
        })()
    }, [])

    const deleteBtn = async (post_id) => {
        if (window.confirm("Are you sure you want to delete it?")) {
            setPosts(posts.filter(post => post.post_id !== post_id))
            await axios.delete(`/delete/${post_id}`)
        }
    }

    return (
        <><div className="head_logo">
            <header>
                <h2>
                    <a href="/"><img src='https://ifh.cc/g/9qtKfn.png' alt="logo" border='0' /></a>
                </h2>
            </header>
        </div>
            <div div className="posts">
                {isEdit ? <Edit newPost={newPost} posts={posts} setPosts={setPosts} isEdit={isEdit} setIsEdit={setIsEdit} /> :
                    posts.map(post => (
                        <div className="post" key={post.post_id}>
                            <section className="post_head">
                                <div className="left_col">
                                    <div>
                                        <img className="profile" alt="profile" src="/icons/smantha.svg" />
                                    </div>
                                    <span className="name_location">
                                        <div className="user_name">
                                            suji kang

                                        </div>
                                        <div className="location">
                                            {post.resName}
                                        </div>
                                    </span>
                                </div>
                                <MoreButtons post_id={post.post_id} deleteBtn={deleteBtn} editBtn={() => {
                                    setIsEdit(!isEdit);
                                    const editPost = posts.find(it => it.post_id === post.post_id);
                                    setNewPost(editPost);
                                }} />
                            </section>
                            <section className="picture">
                                <div>
                                    <img alt="userPic" className="user_pic" src={post.filename} />
                                </div>
                            </section>
                            <section>
                                <div className="second_icon">
                                    <div className="left_icons">
                                        <div className="likes">
                                            <img alt="likes" onClick={() => setIsLike(!isLike)} src={isLike ? "/icons/like.svg" : "/icons/heart.svg"} />
                                        </div>
                                        <div className="message">
                                            <img alt="message" src="/icons/message.svg" />
                                        </div>
                                        <div className="share">
                                            <img alt="share" src="/icons/share.svg" />
                                        </div>
                                    </div>
                                    <div className="right_icon">
                                        <img alt="map" src="/icons/map.svg" width="39" />
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
                            <Comment post_id={post.post_id} />
                        </div>
                    ))}
            </div></>
    );
}

export default Post;