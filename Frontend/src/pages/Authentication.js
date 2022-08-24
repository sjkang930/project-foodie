import React, { useContext } from "react"
import { logInContext, loginEmailContext } from "../App";

const Authentication = () => {
    const { isItLoggedIn } = useContext(logInContext);
    const { email } = useContext(loginEmailContext)
    console.log(email)
    return (
        <div>
            Hello{email.firstName}
        </div>
    )
}
export default Authentication;