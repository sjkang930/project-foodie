import { useState } from "react";

const Post = () => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [count, setCount] = useState(0);
    const [isLike, setIsLike] = useState(false)

    console.log(isLike)
    return (
        <div className="post">homepage
            <div className="post_head">
                <div className="left_col">
                    <div className="user_pic">
                        <img src="/foods/berries-2277__480.jpeg" />
                    </div>
                    <div className="user_name">
                        suji kang
                    </div>
                    <div className="location">
                        mumu kitchen
                    </div>
                </div>
                <div className="right_col">
                    <div className="more_info">
                        <img src="/icons/png.png" />
                    </div>
                </div>

            </div>
            <div className="picture">

            </div>
            <div className="left_icons">
                <img onClick={() => setIsLike(!isLike)} src={isLike ? "/icons/like.svg" : "/icons/heart.svg"} />
                <img src="/icons/message.svg" />
                <img src="/icons/share.svg" />
            </div>
            <div className="right_icon">
                <img src="/icons/map.svg" />
            </div>
            <div className="user_name">
                suji kang
            </div>
            <div className="description">
                sooooo goooood
            </div>
            <div className="comments">
                <div className="total_comments">
                    see all {count} comments
                </div>
                <input
                    className="input_comments"
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        // console.log(e);
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