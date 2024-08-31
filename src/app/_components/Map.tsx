"use client"

import {
  APIProvider,
  Map as MapObject,
  Marker,
} from "@vis.gl/react-google-maps"

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

const Map = () => {
  const position = { lat: -23.567249002262884, lng: -46.66611406311732 }

  return (
    <APIProvider apiKey={API_KEY!}>
      <MapObject
        center={position}
        defaultZoom={17}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <Marker
          position={{ lat: -23.567249002262884, lng: -46.66611406311732 }}
          clickable={true}
          onClick={() => alert("marker was clicked!")}
          title={"Paulo's BarberShop"}
        />
      </MapObject>
    </APIProvider>
  )
}

export default Map
