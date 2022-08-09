import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const SearchRestaurant = ({ restaurantName, setResturantName }) => {
    const [inputData, setInputData] = useState("")
    const [text, setText] = useState('');
    const listInput = useRef()
    const onClick = async () => {
    }
    const onChange = async (e) => {
        setInputData(e.target.value)
        const result = await axios.post("/restaurant", { inputData })
        setText(result.data)
    }
    return (
        <>
            <input
                className="restaurant"
                placeholder="Add a Restaurant"
                onChange={onChange}
                value={inputData}

            ></input>
            <>
                {text.length > 0 ? text.map(restaurant => {
                    if (restaurant.name.toLowerCase().includes(inputData)) {
                        return <li ref={listInput} className="restaurantList" key={restaurant.id}
                            onClick={() => { setInputData(restaurant.name) }}>
                            {restaurant.name}
                        </li>
                    }
                }) : ""}
            </>
            <button onClick={onClick} type="submit">+</button>

        </>
    )
}
export default SearchRestaurant;