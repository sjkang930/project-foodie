import React, { useState, useRef, useContext, useEffect } from 'react';
import axios from "axios";
import { loginEmailContext, logInContext, postContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Authentication from './Authentication';

const LogIn = () => {
    const emailInput = useRef();
    const passwordInput = useRef();
    const [password, setPassword] = useState("")
    const { email, setEmail } = useContext(loginEmailContext)
    const { isItLoggedIn, setIsItLoggedIn } = useContext(logInContext)
    const { posts, setPosts } = useContext(postContext)
    const navigate = useNavigate();


    useEffect(() => {
        (async () => {
            const result = await axios.get('/userInfo')
            if (result.data.email) {
                setIsItLoggedIn(true)
            }
        })()
    }, [])
    const logInBtn = async event => {
        event.preventDefault()
        if (email.length < 1) {
            emailInput.current.focus();
            return;
        }
        if (password.length < 1) {
            passwordInput.current.focus();
            return;
        }
        const data = new FormData()
        data.append("email", email)
        data.append("password", password)
        const result = await axios.post('/login', { email, password })
        if (result.data.verified) {
            setIsItLoggedIn(true)
            setEmail(result.data.thisUser)
            setPosts(result.data.posts)
            navigate('/', { replace: true });
            return
        }
        alert("Invalid email or password!")
        setEmail("")
        setPassword("")
        return
    }

    return (
        <>{isItLoggedIn ? <Authentication /> :
            <div className="login">
                <div className="head_logo">
                    <h2>
                        <a href="/"><img src='/icons/wordmark.svg' alt="logo" border='0' /></a>
                        <img alt="logo" className="logo_burger" src="/icons/logo_burger.svg"></img>
                    </h2>
                </div>
                <div className="loginform">
                    <form>
                        <input
                            ref={emailInput}
                            onChange={(e) => setEmail(e.target.value)}
                            className="inputemail"
                            value={email}
                            placeholder="Email"
                            type="email"
                            name="email"
                        >
                        </input>
                        <input
                            ref={passwordInput}
                            rules={["minLength", "specialChar", "number", "capital", "match"]}
                            minLength={8}
                            onChange={(e) => setPassword(e.target.value)}
                            className="inputpassword"
                            value={password}
                            placeholder="Password"
                            type="password"
                            name="password"
                        >
                        </input>
                        <button onClick={logInBtn} type="submit"> Log In</button>
                    </form>
                </div>
                <div className="logintextwrap">
                    <div className="newhere">
                        <div className="logintext">New Here?</div>
                        <div onClick={() => {
                            navigate('/signup', { replace: true });
                        }}
                            className="logIn">Sign Up</div>
                    </div>
                    <>
                        <div className="forgotPassword">Forgot Password?</div>
                    </>
                </div>
                <div className="signupthridwrap">
                    <div className="thirdparty">
                        <a href="/"><img src='/icons/facebook.svg' alt="logo" border='0' /></a>
                        <a href="/"><img src='/icons/google.svg' alt="logo" border='0' /></a>
                        <a href="/"><img src='/icons/apple.svg' alt="logo" border='0' /></a>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default LogIn;