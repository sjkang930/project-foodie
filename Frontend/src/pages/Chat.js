import React, { useContext } from 'react';
import { logInContext } from '../App';
import LogIn from './LogIn';
const Chat = () => {
    const { isItLoggedIn } = useContext(logInContext)
    return (
        <div className="Chat">
            {isItLoggedIn ?
                <p>Chat page</p>
                : <LogIn />}
        </div>
    )
}
export default Chat;