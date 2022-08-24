import React, { useState, useCallback, useEffect, useMemo, useContext } from 'react';
import { GoogleMap, Marker, useJsApiLoader, InfoWindow, useLoadScript } from '@react-google-maps/api';
import GoogleMapReact from 'google-map-react';
import Head from '../components/Head';
import RestaurantInfo from '../components/RestaurantInfo';
import { useNavigate } from 'react-router-dom';
import { mapDataContext } from '../App';
import axios from "axios"


const containerStyle = {
    width: '1000px',
    height: '800px'
};
const Map = () => {
    const navigate = useNavigate()
    const { mapData } = useContext(mapDataContext)
    const [markers, setMarkers] = useState([])
    const [center, setCenter] = useState({ lat: 49.2835, lng: -123.1153 })
    const [selected, setSelected] = useState(null)
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAcaYDEWjjYRwiUJACWEOHC_HA32gaO7k0',
        libraries: ["places"],
    })
    const [business, setBusiness] = useState("")
    const oneWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    useEffect(() => {
        (async () => {
            const id = mapData.id
            const result = await axios.post(`/hours/${id}`)
            setBusiness(result.data)
        })()
    }, [])
    const onMapClick = useCallback((event) => {
        setMarkers((current) => [
            ...current,
            {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),
            }
        ])

    }, [])

    const onMapLoad = () => {
        if (mapData.id) {
            setMarkers([
                { lat: mapData.coordinates.latitude, lng: mapData.coordinates.longitude, time: new Date(), }
            ])
        }
    }

    const restaurantDetails = () => {
        navigate('/restaurant', { replace: true });
    }


    if (loadError) {
        return "Error loading maps";
    }
    if (!isLoaded) return <div>"Loading Maps"</div>;
    return (
        <>
            <Head name="Restaurants Nearby" /><div className='Map'>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapData.id ? { lat: mapData.coordinates.latitude, lng: mapData.coordinates.longitude } : center}
                    zoom={15}
                    onClick={onMapClick}
                    onLoad={onMapLoad}
                >
                    {markers.map(marker =>
                        <Marker
                            key={marker.time.toISOString()}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            icon={{
                                url: '/icons/logo_burger.svg',
                                scaledSize: new window.google.maps.Size(40, 40),
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15),
                            }}
                            onClick={() => {
                                setSelected(marker)
                            }}
                        />)}
                    {selected ? (<InfoWindow position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => { setSelected(null) }}>
                        <div className='restaurant_info'>
                            <h1 onClick={restaurantDetails}>{mapData.name}</h1>
                            <h2>Address: {mapData.location.address1}</h2>
                            <h2>{mapData.location.city} {mapData.location.state}, {mapData.location.zip_code}</h2>
                            <h3>Phone: {mapData.display_phone}</h3>
                            <ul>Open hours:
                                {business ? (business.hours[0].open.map(hours => {
                                    return (<li key={hours.day}>  {oneWeek[hours.day]}: {hours.start} ~ {hours.end} </li>)
                                })) : null}
                                <img className="restaurant_img" alt="restaurant_img" src={business ? business.image_url : "/icons/map.svg"} width="39" />
                            </ul>
                            <div className="restaurant_img_div">

                            </div>
                        </div>
                    </InfoWindow>) : null}
                </GoogleMap>
                <RestaurantInfo business={business} />
            </div>
        </>
    )


}
export default Map;


