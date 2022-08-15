import React from 'react';
// import { Route, Router } from 'react-router';
const Head = ({ name }) => {
    return (
        <div className='Head'>
            <a href="/"><img className="back_logo" src='/icons/backbutton.svg' alt="logo" /></a>
            <h2>{name} Post</h2>
        </div>

    )
}

export default Head;