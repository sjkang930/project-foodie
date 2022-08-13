import axios from 'axios';
import React, { useState } from 'react';

const SearchRestaurant = ({ restaurantName, setResturantName, newPost }) => {
    const [text, setText] = useState('');

    const onChange = async (e) => {
        setResturantName(e.target.value)
        const result = await axios.post("/restaurant", { restaurantName })
        setText(result.data)
    }
    return (
        <>
            <input
                className="restaurant"
                placeholder="Add a Restaurant"
                onChange={onChange}
                value={restaurantName}
            ></input>
            <ul>
                {text.length > 0 ? text.map(restaurant => {
                    if (restaurant.name.toLowerCase().includes(restaurantName)) {
                        return (<li className="restaurantList" key={restaurant.id}
                            onClick={() => { setResturantName(restaurant.name) }}>
                            {restaurant.name}</li>)
                    }
                }) : ""}
            </ul>
        </>
    )
}
export default SearchRestaurant;