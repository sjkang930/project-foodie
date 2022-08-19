import React from 'react';
const SignUp = () => {
    return (
        <div className="signup">
            <div className="head_logo">
                <h2>
                    <a href="/"><img src='/icons/wordmark.svg' alt="logo" border='0' /></a>
                </h2>
            </div>
            <div className="signUpForm">
                <form>
                    <input
                        className="inputFirstName"
                        placeholder="First Name"
                        type="text"
                        name="firstname"
                    ></input>
                    <input
                        className="lastName"
                        placeholder="Last Name"
                        type="text"
                        name="lastname"
                    ></input>
                    <input
                        className="email"
                        placeholder="Email"
                        type="email"
                        name="email"
                    >
                    </input>
                    <input
                        className="password"
                        placeholder="Password"
                        type="password"
                        name="password"
                    >
                    </input>
                    <button onClick={() => {

                    }}
                        type="submit"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;