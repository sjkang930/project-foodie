import axios from "axios";
import { useState } from "react";

const Create = () => {
    const [file, setFile] = useState()
    const [description, setDescription] = useState("")

    const submit = async event => {
        event.preventDefault()
        const data = new FormData()
        data.append('image', file)
        data.append('description', description)
        const result = await axios.post('/create', data)
        console.log(result)
    }
    return (
        <div className="Create">
            <form onSubmit={submit}>
                <input filename={file} onChange={(e) => {
                    setFile(e.target.files[0])
                }}
                    type="file"
                    accept="image/*">

                </input>
                <input onChange={(e) => setDescription(e.target.value)} type="text" placeholder="description"></input>
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}
export default Create;