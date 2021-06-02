import React from 'react'
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '1200px',
  height: '800px'
};

const startlocation = { lat: 30.2672, lng: 97.7431}

function TripMap(props) {


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDvpoWPND39au4Ski7T2nKhWOfcLyjQRfk"
  })

    const [map, setMap] = React.useState(null)
    

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={startlocation}
        zoom={4}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

// const TripMap = props => {

//     const startlocation = { lat: 30.2672, lng: 97.7431}
    

//     return(
//         <div>
//             <GoogleMap />
//         </div>
//     )

// }

export default React.memo(TripMap)


