import React, { useState, useRef, useContext, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { logInContext } from "../App";
import Authentication from './Authentication';

const SignUp = () => {
    const { isItLoggedIn, setIsItLoggedIn } = useContext(logInContext)
    const firstNameInput = useRef();
    const lastNameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();


    useEffect(() => {
        (async () => {
            const result = await axios.get('/auth')
            if (result.data.email) {
                setIsItLoggedIn(true)
            }
        })()
    }, [])

    const signUp = async event => {
        event.preventDefault()
        if (firstName.length < 1) {
            firstNameInput.current.focus();
            return;
        }
        if (lastName.length < 1) {
            lastNameInput.current.focus();
            return;
        }
        if (email.length < 1) {
            emailInput.current.focus();
            return;
        }
        if (password.length < 1) {
            passwordInput.current.focus();
            return;
        }
        const data = new FormData()
        data.append("firstName", firstName)
        data.append("lastName", lastName)
        data.append("email", email)
        data.append("password", password)
        const result = await axios.post('/signup', { firstName, lastName, email, password })
        console.log("result.data", result.data)
        if (!(result.data)) {
            alert("This email already existed")
            setFirstName("")
            setLastName("")
            setPassword("")
            setEmail("")
            return
        }
        alert("successfully signup")
        navigate('/login', { replace: true });
    }

    return (
        <>{isItLoggedIn ? <Authentication /> :
            <div className="signup">
                <div className="head_logo">
                    <h2>
                        <a href="/"><img src='/icons/wordmark.svg' alt="logo" border='0' /></a>
                        <img class="logo_burger" src="/icons/logo_burger.svg"></img>
                    </h2>
                </div>
                <div className="signUpForm">
                    <form onSubmit={signUp}>
                        <input
                            ref={firstNameInput}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="inputFirstName"
                            value={firstName}
                            placeholder="First Name"
                            type="text"
                            name="firstname"
                        ></input>
                        <input
                            ref={lastNameInput}
                            onChange={(e) => setLastName(e.target.value)}
                            className="lastName"
                            value={lastName}
                            placeholder="Last Name"
                            type="text"
                            name="lastname"
                        ></input>
                        <input
                            ref={emailInput}
                            onChange={(e) => setEmail(e.target.value)}
                            className="email"
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
                            className="password"
                            value={password}
                            placeholder="Password"
                            type="password"
                            name="password"
                        >
                        </input>
                        <button type="submit"> Sign Up</button>
                    </form>
                </div>
                <div className="logintextwrap">
                    <div className="logintext">Already singed Up?</div>
                    <div onClick={() => {
                        navigate('/login', { replace: true });
                    }}
                        className="logIn">Log In</div>
                </div>
                <div className="signupthridwrap">
                    <div className="thirdparty">
                        <a href="/"><img src='/icons/facebook.svg' alt="logo" border='0' /></a>
                        <a href="/"><img src='/icons/google.svg' alt="logo" border='0' /></a>
                        <a href="/"><img src='/icons/apple.svg' alt="logo" border='0' /></a>
                    </div>
                </div>
            </div>}</>
    )
}

export default SignUp;