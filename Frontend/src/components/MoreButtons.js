import React, { useState } from "react";

const MoreButtons = ({ post_id, deleteBtn, editBtn }) => {
    const [moreButtons, setMoreButtons] = useState(false);
    const cancelBtn = () => {
        setMoreButtons(!moreButtons)
    }
    return (
        <>
            <div className="right_col">
                <div className="more_buttons">
                    {moreButtons ? <>
                        <button onClick={() => deleteBtn(post_id)} className="delete_btn">Delete</button>
                        <button onClick={editBtn} className="edit_btn">Edit</button>
                        <button onClick={cancelBtn} className="cancel_btn">Cancel</button>
                    </> : ""}
                </div>
                <div className="img_div">
                    <img alt="moreInfoIcon" onClick={() => setMoreButtons(!moreButtons)} src="/icons/png.png" />
                </div>
            </div>
        </>
    )
}

export default MoreButtons;

