import React from 'react';

const Head = ({ name }) => {
    return (
        <div className='headwrap'>
            <div className="head_logo">
                    <h2>
                        <a href="/"><img src='https://ifh.cc/g/9qtKfn.png' alt="logo" border='0' /></a>
                    </h2>
            </div>
            <div className="back_logo">
                <a href="/"><img src='/icons/backbutton.svg' alt="logo" /></a>
                <h2>{name}</h2>
            </div>
        </div>
    )
}

export default Head;