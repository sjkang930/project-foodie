import React, { useState, useEffect } from "react";
import axios from "axios";

const MapIcon = ({ post_id }) => {

    const onClickMap = async () => {
        await axios.post(`/mapIcon/${post_id}`)
    }
    return (
        <div className="right_icon">
            <img className="map_icon" onClick={onClickMap} alt="map" src="/icons/map.svg" width="39" />
        </div>
    )
}

export default MapIcon;