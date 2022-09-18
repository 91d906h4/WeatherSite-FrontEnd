import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker, Popup } from "react-leaflet";

function Map(props){
    const location = [props["latitude"], props["longitude"]];


    return (
        <MapContainer center={location} zoom={11} scrollWheelZoom={false} style={{width: "95%", height: "300px"}}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={location}>
                <Popup>
                    測站：{props["station"]}<br />
                    ID：{props["station_id"]}
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map;