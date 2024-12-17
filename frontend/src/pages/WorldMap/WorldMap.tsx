import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'

//styles
import './WorldMap.css';
import {useAppDispatch, useAppSelector} from "../../store.ts";
import {useEffect} from "react";
import {fetchRows} from "../../slices/countries-slice.ts";


export default function WorldMap() {
    const dispatch = useAppDispatch();
    const { rows, loading, error } = useAppSelector((state) => state.table);

    useEffect(() => {
        dispatch(fetchRows({ page: 1, limit: 5 }));
    }, [dispatch, 1]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div id="map">
            <MapContainer center={[50,0]} zoom={1.5} scrollWheelZoom={true} worldCopyJump={false} maxBounds={[
                [-80, -180], // Southwest corner (latitude, longitude)
                [80, 180],   // Northeast corner (latitude, longitude)
            ]}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {rows?.data.map((country: any) => (
                    <Marker key={country.code} position={[country.lat, country.lng]}>
                        <Popup>
                            <h3>{country.name}</h3>
                            <p>Population: {country.population}</p>
                            <p>Size: {country.size}</p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}