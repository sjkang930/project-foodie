import axios from "axios";
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const descriptionInput = useRef();
    const fileRef = useRef(null);
    const [file, setFile] = useState();
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const submit = async event => {
        event.preventDefault()
        if (description.length < 1) {
            descriptionInput.current.focus();
            return;
        }
        if(!file){
            fileRef.current.focus();
            return;
        }

        const data = new FormData()
        data.append('image', file)
        data.append('description', description)
        const result = await axios.post('/create', data)
        alert("successfully posted")
        navigate('/', { replace: true });
        console.log(result)
    }

    return (
        <div className="Create">
            <form onSubmit={submit}>
                <input
                    ref={fileRef}
                    filename={file}
                    onChange={(e) => {
                        setFile(e.target.files[0])
                    }}
                    type="file"
                    accept="image/*">
                </input>

                <input
                    ref={descriptionInput}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    placeholder="description"></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default Create;