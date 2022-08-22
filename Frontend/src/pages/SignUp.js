import React, { useState } from 'react';
import axios from "axios";

const SignUp = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    console.log(firstName)

    const signUp = async event => {

        event.preventDefault()
        const data = new FormData()
        data.append("firstName", firstName)
        data.append("lastName", lastName)
        data.append("email", email)
        data.append("password", password)
        await axios.post('/signup', {firstName, lastName, email, password})
        console.log("data", data)
    }

    return (
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
                        onChange={(e) => setFirstName(e.target.value)}
                        className="inputFirstName"
                        placeholder="First Name"
                        type="text"
                        name="firstname"
                    ></input>
                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        className="lastName"
                        placeholder="Last Name"
                        type="text"
                        name="lastname"
                    ></input>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className="email"
                        placeholder="Email"
                        type="email"
                        name="email"
                    >
                    </input>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className="password"
                        placeholder="Password"
                        type="password"
                        name="password"
                    >
                    </input>
                    <button type="submit"> Sign Up</button>
                </form>
            </div>
            <div className="signupthridwrap">
                <div className="thirdparty">
                    <a href="/"><img src='/icons/facebook.svg' alt="logo" border='0' /></a>
                    <a href="/"><img src='/icons/google.svg' alt="logo" border='0' /></a>
                    <a href="/"><img src='/icons/apple.svg' alt="logo" border='0' /></a>
                </div>
            </div>
        </div>
    )
}

export default SignUp;