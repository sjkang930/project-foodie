import { useState, useEffect } from "react";
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
            setPosts(result.data.posts)
        }) ()
    }, [])

    const submit = async (event) => {
        event.preventDefault()
        setComments([...comments, comment])
        setComment("")
        setCount(count + 1)
        const result = await axios.post('/posts', { comment })
    }
    return (
        <div div className="post" >
            <div className="post_head">
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
            </div>
            <div className="picture">
                <div >
                    <img className="user_pic" src="/foods/berries-2277__480.jpeg" />
                </div>
            </div>

            <div>
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
            </div>

            <section className="user_name_description">
                <div className="user_name">
                    suji kang
                </div>
                <div className="description">
                    sooooo goooood
                </div>
            </section>

            <div className="comments">
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
                        {posts.map(post => <li key={post.id} className="comment_list">{post.comment}</li>)}
                        {comments.map((comment, index) => <li key={index} className="comment_list">{comment}</li>
                        )}
                    </ul>
                </div>
            </div>
        </div >
    );
}

export default Post;