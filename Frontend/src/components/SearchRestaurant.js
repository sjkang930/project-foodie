import axios from 'axios';
import React, { useState } from 'react';

const SearchRestaurant = ({ restaurantName, setResturantName, place, setPlace }) => {
    const [text, setText] = useState('');

    const changePlace = (e) => {
        setPlace(e.target.value)
        console.log("place", place)
    }

    const onChange = async (e) => {
        setResturantName(e.target.value)
        const result = await axios.post("/restaurant", { restaurantName, place })
        setText(result.data)
    }
    return (
        <>
            <br />
            Select the City<br />
            <select value={place} onChange={changePlace} name="city">
                <option value="49.3200,-123.0724">North Vancouver</option>
                <option value="49.2827,-123.1207">Vancouver</option>
                <option value="49.2488,-122.9805">Burnaby</option>
                <option value="49.1913,-122.8490">Surrey</option>
                <option value="49.1042,-122.6604">Langley</option>
            </select><br />
            <input
                className="restaurant"
                placeholder="Add a Restaurant"
                onChange={onChange}
                value={restaurantName}
            ></input>
            <ul className="restaurant_ul">
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