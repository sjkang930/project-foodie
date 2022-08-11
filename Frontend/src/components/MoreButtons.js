// import React from 'react';
import React, { useState } from "react";

const MoreButtons = () => {
    const [moreButtons, setMoreButtons] = useState(false);
    console.log(moreButtons)
    return (
        <>
            <div className="right_col">
                <div className="more_buttons">
                    <img alt="moreInfoIcon" onClick={() => setMoreButtons(!moreButtons)}  src="/icons/png.png" />
                    {moreButtons ? <><button>edit</button><button>delete</button><button>cancel</button></>:""}
                </div>
            </div>
        </>

    )
}

export default MoreButtons;