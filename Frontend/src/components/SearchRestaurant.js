import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SearchRestaurant = ({ restaurantName, setResturantName }) => {
    const [text, setText] = useState('');
    const onClick = async () => {

    }
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
            <>
                {text.length > 0 ? text.map(restaurant => {
                    if (restaurant.name.toLowerCase().includes(restaurantName)) {
                        return <li className="restaurantList" key={restaurant.id}
                            onClick={() => { setResturantName(restaurant.name) }}>
                            {restaurant.name}
                        </li>
                    }
                }) : ""}
            </>
        </>
    )
}
export default SearchRestaurant;