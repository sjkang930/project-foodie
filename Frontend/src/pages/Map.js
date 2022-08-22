import React, { useState, useCallback, useEffect, useMemo, useContext } from 'react';
import { GoogleMap, Marker, useJsApiLoader, InfoWindow, useLoadScript } from '@react-google-maps/api';
import GoogleMapReact from 'google-map-react';
import Head from '../components/Head';
import { mapDataContext } from '../App';


const containerStyle = {
    width: '1000px',
    height: '800px'
};
const Map = () => {
    const { mapData } = useContext(mapDataContext)
    console.log("mapData", mapData)
    const [markers, setMarkers] = useState([])
    const [center, setCenter] = useState({ lat: 49.2835, lng: -123.1153 })
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAcaYDEWjjYRwiUJACWEOHC_HA32gaO7k0',
        libraries: ["places"],
    })
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
    if (!isLoaded) return <div>"Loading Maps"</div>;
    return (
        <>
            <Head name="Restaurants Nearby" /><div className='Map'>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapData.id ? { lat: mapData.coordinates.latitude, lng: mapData.coordinates.longitude } : center}
                    zoom={15}
                    onClick={onMapClick}
                >
                    {markers.map(marker =>
                        <Marker
                            key={marker.time.toISOString()}
                            position={mapData.id ? { lat: mapData.coordinates.latitude, lng: mapData.coordinates.longitude } : { lat: marker.lat, lng: marker.lng }}
                            icon={{
                                url: '/icons/logo_burger.svg',
                                scaledSize: new window.google.maps.Size(30, 30),
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15),
                            }} />)}
                </GoogleMap>
            </div>
        </>
    )


}
export default Map;



// const coordinates = { lat: 49.2835, lng: -123.1153 }

// return (
//     <div className='Map'>
//         <GoogleMapReact
//             bootstrapURLKeys={{ key: 'AIzaSyAcaYDEWjjYRwiUJACWEOHC_HA32gaO7k0' }}
//             defaultCenter={coordinates}
//             center={coordinates}
//             defaultZoom={12}
//             margin={[50, 50, 50, 50]}
//             yesIWantToUseGoogleMapApiInternals
//             options={''}
//             onChang={''}
//             onChildClick={''}
//         >
//         </GoogleMapReact>
//     </div>
// )    