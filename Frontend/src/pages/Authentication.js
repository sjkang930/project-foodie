import React, { useContext, useEffect, useState } from "react"
import { logInContext, loginEmailContext } from "../App";
import axios from 'axios'

const Authentication = () => {
    const { isItLoggedIn } = useContext(logInContext);
    const [user, setUser] = useState("")
    console.log(isItLoggedIn)

    useEffect(() => {
        (async () => {
            const result = await axios.get('/userInfo')
            if (result.data) {
                console.log(result.data)
                setUser(result.data.user)
            }
        })()
    }, [])

    return (
        <div>
            Hello {user.firstname} {user.lastname}
        </div>
    )
}
export default Authentication;