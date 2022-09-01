import React, { useContext, useEffect, useState } from "react"
import { logInContext, loginEmailContext } from "../App";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Authentication = () => {
    const { isItLoggedIn, setIsItLoggedIn } = useContext(logInContext);

    const [user, setUser] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const result = await axios.get('/userInfo')
            if (result.data) {
                console.log(result.data)
                setUser(result.data.user)
            }
        })()
    }, [])

    const onClickLogout = async (e) => {
        e.preventDefault()
        console.log("clicked")
        await axios.post('/logout')
        navigate('/Login', { replace: true });
        setIsItLoggedIn(!isItLoggedIn)
        return
    }

    return (
        <div>
            <form onClick={onClickLogout}>
                Hello {user.firstname} {user.lastname}
                <button className="logout">Log Out</button>
            </form>
        </div>
    )
}
export default Authentication;