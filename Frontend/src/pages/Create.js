import axios from "axios";
import { useState } from "react";

const Create = () => {
    const [file, setFile] = useState("")
    const [caption, setCaption] = useState("")

    const submit = async event => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("imgae", file)
        formData.append("caption", caption)
        await axios.post("/create", {formData}, {headers: {'Content-Type': 'multipart/form-data'}})
    }
        return (
        <div className="Create">
            <form onSubmit={submit}>
                <input onChange={e=> setFile(e.target.files[0])} type="file" accept="image/*"></input>
                <input value={caption} onChange={(e) =>setCaption(e.target.value)} type="text" placeholder="description"></input>
                <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}
export default Create;