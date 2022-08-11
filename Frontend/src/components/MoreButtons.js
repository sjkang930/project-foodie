// import React from 'react';
import React, { useState } from "react";

const MoreButtons = ({ post_id, deleteBtn }) => {
    const [moreButtons, setMoreButtons] = useState(false);
    const cancelBtn = () => {
        setMoreButtons(!moreButtons)
    }
    return (
        <>
            <div className="right_col">

                <div className="more_buttons">
                    {moreButtons ? <><button className="delete_btn">Delete</button><button className="edit_btn">Edit</button><button onClick={cancelBtn} className="cancel_btn">Cancel</button></> : ""}
                </div>
                <div className="img_div">
                    <img alt="moreInfoIcon" onClick={() => setMoreButtons(!moreButtons)} src="/icons/png.png" />
                </div>
            </div>
        </>

    )
}

export default MoreButtons;

