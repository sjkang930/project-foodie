import React, { useState } from 'react';

const LogIn = () => {
    const [user, setUser] = useState("")
    const logInBtn = () => {

    }
    return (
        <div className="Profile">
            <form>
                <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    id="email"
                >
                </input>
                <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    id="password"
                >
                </input>
                <button onClick={() => {
                     
                }}
                    type="submit"
                >
                    Log In
                </button>
            </form>
        </div>
    )
}
export default LogIn;