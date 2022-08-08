import axios from 'axios';
import React, { useEffect, useState } from 'react';
const SearchRestaurant = ({ restaurantName, setResturantName }) => {
    const onClick = async () => {
        const result = await axios.post("/restaurant", { restaurantName })
        console.log(result)
    }
    return (
        <div>

            <input
                placeholder="Add a Restaurant"
                onChange={(e) => setResturantName(e.target.value)}
            ></input>

            <button onClick={onClick} type="submit">+</button>


        </div>
    )
}
export default SearchRestaurant;