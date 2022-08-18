import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader, InfoWindow, useLoadScript } from '@react-google-maps/api';
import Head from '../components/Head';

const libraries = ["places"]
const containerStyle = {
    width: '1000px',
    height: '800px'
};
// const options = {

// }

const Map = () => {
    const [markers, setMarkers] = useState([])

    const center = {
        lat: 49.2835,
        lng: -123.1153
    };
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAcaYDEWjjYRwiUJACWEOHC_HA32gaO7k0',
        libraries,
    })

    const [map, setMap] = useState(null)
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
    if (loadError) {
        return "Error loading maps";
    }
    if (!isLoaded) {
        return "Loading Maps";
    }

    return (
        <>
            <Head name="Restaurants Nearby" /><div className='Map'>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                    onClick={onMapClick}
                >
                    {markers.map(marker =>
                        <Marker
                            key={marker.time.toISOString()}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            icon={{
                                url: '/icons/logo_burger.svg',
                                scaledSize: new window.google.maps.Size(30, 30),
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15),
                            }}
                        />)}

                </GoogleMap>
            </div>
        </>
    )
}
export default React.memo(Map)