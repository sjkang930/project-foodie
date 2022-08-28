import React, { useState, useEffect, useContext, useMemo } from "react";
import axios from 'axios'
import Comment from "../components/Comment";
import MoreButtons from "../components/MoreButtons";
import Edit from "../components/Edit";
import MapIcon from "../components/MapIcon";
import { mapDataContext, logInContext, loginEmailContext, postContext } from "../App";
import LogIn from "./LogIn";
import { useNavigate } from 'react-router-dom';

const Post = ({ isEdit, setIsEdit }) => {
    const { setMapData } = useContext(mapDataContext)
    const { isItLoggedIn, setIsItLoggedIn } = useContext(logInContext)
    const { email, setEmail } = useContext(loginEmailContext)
    const [isLike, setIsLike] = useState(false);
    const { posts, setPosts } = useContext(postContext)
    const [newPost, setNewPost] = useState("")
    const navigate = useNavigate()
    const imgClick = () => {
        navigate('/', { replace: true });
    }

    useMemo(() => {
        (async () => {
            const result = await axios.get('/posts')
            setPosts(result.data.posts)
            setEmail(result.data.user)
            setIsItLoggedIn(true)
        })()
    }, [])

    const deleteBtn = async (post_id, user_id) => {
        if (user_id !== email.user_id) {
            window.confirm("You can not access!")
            return
        }
        if (window.confirm("Are you sure you want to delete it?")) {
            setPosts(posts.filter(post => post.post_id !== post_id))
            await axios.delete(`/delete/${post_id}`)
        }
    }

    return (
        <>{isItLoggedIn ?
            <>
                {!(isEdit) ?
                    <>
                        <div className="head_logo">
                            <header>
                                <h2>
                                    <img onClick={imgClick} src='https://ifh.cc/g/9qtKfn.png' alt="logo" border='0' />
                                </h2>
                            </header>
                        </div><div div className="posts">

                            {posts.map(post => (
                                <div className="post" key={post.post_id}>
                                    <section className="post_head">
                                        <div className="left_col">
                                            <div>
                                                <img className="profile" alt="profile" src="/icons/smantha.svg" />
                                            </div>
                                            <span className="name_location">
                                                <div className="user_name">
                                                    {email.firstname} {email.lastname}
                                                </div>
                                                <div className="location">
                                                    {post.resName}
                                                </div>
                                            </span>
                                        </div>
                                        <MoreButtons post_id={post.post_id} user_id={post.user_id} deleteBtn={deleteBtn} editBtn={() => {
                                            if (post.user_id !== email.user_id) {
                                                window.confirm("You can not access!");
                                                return;
                                            }
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
                                            <MapIcon post_id={post.post_id} setMapData={setMapData} />
                                        </div>
                                    </section>
                                    <section className="user_name_description">
                                        <div className="user_name">
                                            {email.firstname} {email.lastname}
                                        </div>
                                        <div className="description">
                                            {post.description}
                                        </div>
                                    </section>
                                    <Comment post_id={post.post_id} />
                                </div>
                            ))}
                        </div>
                    </> :
                    <Edit newPost={newPost} isEdit={isEdit} setIsEdit={setIsEdit} />}
            </>
            : <LogIn />}
        </>
    );
}

export default Post;
