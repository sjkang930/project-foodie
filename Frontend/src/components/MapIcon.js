import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { mapDataContext, postContext } from "../App";
const MapIcon = ({ post_id }) => {

    const navigate = useNavigate()
    const { setMapData } = useContext(mapDataContext)

    const onClickMap = async () => {
        const result = await axios.post(`/mapIcon/${post_id}`)
        setMapData(result.data)
        navigate('/Map', { replace: true });
    }
    return (
        <div className="right_icon">
            <img className="map_icon" onClick={onClickMap} alt="map" src="/icons/map.svg" width="39" />
        </div>
    )
}

export default MapIcon;