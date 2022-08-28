import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { loginEmailContext } from "../App";

const CommentList = ({ comments, setComments, post_id }) => {
    const { email, setEmail } = useContext(loginEmailContext)
    const [editComment, setEditComment] = useState(false);
    const [thisComment_id, setThisComment_id] = useState("")
    const cancelBtn = () => {
        setEditComment(!editComment)
    }
    const commentClick = (targetId) => {
        setThisComment_id(targetId)
        setEditComment(!editComment)
    }
    const deleteBtn = async (id, user_id) => {
        if (user_id !== email.user_id) {
            window.confirm("You can not access!")
            return
        }
        if (window.confirm("Are you sure you want to delete it?")) {
            setComments(comments.filter(it => it.comment_id !== id))
            await axios.delete(`/comments/${id}`)
        }
        return
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
                                                    <button
                                                        onClick={() => {
                                                            deleteBtn(it.comment_id, it.user_id);
                                                        }}>delete
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