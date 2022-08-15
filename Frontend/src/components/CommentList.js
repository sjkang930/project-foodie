import React, { useState, useEffect } from "react";

const CommentList = ({ comments, post_id }) => {
    const [editComment, setEditComment] = useState(false);
    const [thisComment_id, setThisComment_id] = useState("")
    const cancelBtn = () => {
        setEditComment(!editComment)
    }

    const commentClick = (targetId) => {
        console.log(targetId)
        setThisComment_id(targetId)
        setEditComment(!editComment)
        console.log(editComment)
    }

    return (
        <div className="commentList">
            <ul className="comment_wrap">
                {comments.map(it => {
                    if (it.post_id === post_id) {
                        return (
                            <li key={it.comment_id} className="comment_list">
                                <div className="comment_div">{it.comment}</div>
                                <div className="comment_btn_div">
                                    <>
                                        {
                                            (it.comment_id == thisComment_id && editComment) ?
                                                <>< button
                                                    onClick={() => {
                                                        cancelBtn();
                                                    }}>cancel
                                                </button>
                                                    <button>
                                                        delete
                                                    </button>
                                                </> : ""
                                        }
                                    </ >

                                    <img onClick={() => commentClick(it.comment_id)}
                                        className="comment_edit_btn" alt="editComment" src="/icons/png.png" />


                                </div>
                            </li>)
                    }
                }
                )}
            </ul >
        </div >
    )
}

export default CommentList;