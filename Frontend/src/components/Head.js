import React from 'react';
// import { Route, Router } from 'react-router';
const Head = ({ name }) => {
    return (
        <>
            <a href="/"><img className="head_logo" src='icons/back button.svg' alt="logo" /></a>
            <h2>{name} Post</h2>
        </>

    )
}

export default Head;