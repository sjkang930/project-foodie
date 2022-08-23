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
    const [place, setPlace] = useState("49.2827,-123.1207");
    const navigate = useNavigate();
    const { post_id } = newPost
    const [imageSrc, setImageSrc] = useState('');

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
        data.append('place', place)
        const result = await axios.put(`/edit/${post_id}`, data)
        const { image_url } = result.data
        setPosts(posts.map(it => it.post_id !== newPost.post_id ? it : { filename: image_url, description, resName: restaurantName }))
        alert("successfully edited")
        setIsEdit(!isEdit)
        navigate('/', { replace: true });
    }

    const encodeFileToBase64 = (fileBlob) => {

        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);

        return new Promise((resolve) => {
            reader.onload = () => {
                setImageSrc(reader.result);
                resolve();
            };
        });
    };

    return (
        <div>


            <Head name="Edit Post" />
            <div className="card">
                <div className="preview_div">
                    {imageSrc || newPost.filename ? <img className='preview' src={imageSrc ? imageSrc : newPost.filename} alt="preview-img" /> : <div className="inner_div">Preview Image</div>}
                </div>
                <div className="post_form">
                    <form onSubmit={submit}>

                        <>
                            <input className="file"
                                ref={fileRef}
                                filename={file}
                                onChange={(e) => {
                                    encodeFileToBase64(e.target.files[0]);
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
                        <SearchRestaurant place={place} setPlace={setPlace} restaurantName={restaurantName} setResturantName={setResturantName} />
                        <button type="submit">Edit</button>
                    </form>
                </div>
            </div>


        </div >
    )
}
export default Edit;
