import axios from "axios";
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchRestaurant from '../components/SearchRestaurant'
import Head from '../components/Head'
// import './create.css'; 

const Create = () => {
    const descriptionInput = useRef();
    const fileRef = useRef(null);
    const [file, setFile] = useState();
    const [description, setDescription] = useState("");
    const [restaurantName, setResturantName] = useState("");
    const navigate = useNavigate();

    const submit = async event => {
        event.preventDefault()
        if (description.length < 1) {
            descriptionInput.current.focus();
            return;
        }
        if (!file) {
            fileRef.current.focus();
            return;
        }
        const data = new FormData()
        data.append('image', file)
        data.append('description', description)
        data.append('resName', restaurantName)
        const result = await axios.post('/create', data)
        alert("successfully posted")
        navigate('/', { replace: true });
        console.log(result)
    }

    return (
        <div>
            <Head />
            <div className="card">
                <form onSubmit={submit}>
                    <>
                        <input className="file"
                            ref={fileRef}
                            filename={file}
                            onChange={(e) => {
                                setFile(e.target.files[0])
                            }}
                            type="file"
                            accept="image/*">
                        </input>
                    </>
                    <>
                        <input className="description"
                            ref={descriptionInput}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            placeholder="Write a Caption..."></input>
                    </>
                    <SearchRestaurant restaurantName={restaurantName} setResturantName={setResturantName} />
                    <button type="submit">Post</button>
                </form>
            </div>


        </div>
    )
}
export default Create;