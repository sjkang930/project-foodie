import axios from "axios";
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchRestaurant from '../components/SearchRestaurant'
import Head from '../components/Head'
const Edit = ({ newPost, isEdit, setIsEdit, setPosts, posts }) => {
    const descriptionInput = useRef();
    const fileRef = useRef(null);
    const [file, setFile] = useState();
    const [description, setDescription] = useState("");
    const [restaurantName, setResturantName] = useState("");
    const navigate = useNavigate();
    const { post_id } = newPost

    useEffect(() => {
        setDescription(newPost.description)
        setResturantName(newPost.resName)
    }, [])

    const submit = async (event) => {
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
        const result = await axios.put(`/edit/${post_id}`, data)
        const { image_url } = result.data
        setPosts(posts.map(it => it.post_id !== newPost.post_id ? it : { filename: image_url, description, resName: restaurantName }))
        alert("successfully edited")
        setIsEdit(!isEdit)
        navigate('/', { replace: true });
    }
    return (
        <div>
            <Head name="Edit" />
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
                        ></input>
                    </>
                    <SearchRestaurant restaurantName={restaurantName} setResturantName={setResturantName} />
                    <button type="submit">Post</button>
                </form>
            </div>
        </div>
    )
}
export default Edit;
