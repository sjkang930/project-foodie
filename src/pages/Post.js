import { useState } from "react";

const Post = () => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [count, setCount] = useState(0);
    const [isLike, setIsLike] = useState(false);

    return (
        <div className="post">
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
                <div className="user_pic">
                    <img src="/foods/berries-2277__480.jpeg" width="600" height="400"/>
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
                    see all {count} comments
                </div>

                <input
                    className="input_comments"
                    placeholder="Add a Comment..."
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setComments([...comments, comment])
                            setComment("")
                            setCount(count + 1)
                        }
                    }}
                    type="text" />
                <div>
                    <ul>
                        {comments.map((comment) => <li>{comment}</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Post;