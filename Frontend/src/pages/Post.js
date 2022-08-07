import React, { useState, useEffect } from "react";
import axios from 'axios'
import Comment from "../components/Comment";

const Post = () => {
    const [isLike, setIsLike] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await axios.get('/posts')
            setPosts(result.data)
        })()
    }, [])

    return (
        <div className="posts">
            {posts.map(post => (
                <div className="post" key={post.post_id} >
                    <section className="post_head">
                        <div className="left_col">
                            <div className="profile">
                                <img alt="profile" src="/icons/smantha.svg" />
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
                                <img alt="moreInfoIcon" src="/icons/png.png" />
                            </div>
                        </div>
                    </section>

                    <section className="picture">
                        <div >
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
        </div>
    );
}

export default Post;