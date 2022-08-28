import React from 'react';
import { useNavigate } from 'react-router-dom';

const Head = ({ name }) => {
    const navigate = useNavigate()
    const imgClick = () => {
        navigate('/', { replace: true });
    }
    return (
        <div className='headwrap'>
            <div className="head_logo">
                <h2>
                    <img onClick={imgClick} src='https://ifh.cc/g/9qtKfn.png' alt="logo" border='0' />
                </h2>
            </div>
            <div className="back_logo">
                <a href="/"><img src='/icons/backbutton.svg' alt="logo" /></a>
                <h2>{name}</h2>
            </div>
        </div >
    )
}

export default Head;