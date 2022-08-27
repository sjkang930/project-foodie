import React, { useContext, useEffect } from 'react';
import { logInContext } from '../App';
import axios from 'axios'
import LogIn from './LogIn';
const Chat = () => {
    const { isItLoggedIn, setIsItLoggedIn } = useContext(logInContext)

    useEffect(() => {
        (async () => {
            const result = await axios.get('/auth')
            if (result.data.email) {
                setIsItLoggedIn(true)
            }
        })()
    }, [])
    return (
        <div className="Chat">
            {isItLoggedIn ?
                <p>Chat page</p>
                : <LogIn />}
        </div>
    )
}
export default Chat;