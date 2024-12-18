import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'

//styles
import './WorldMap.css';
import {useAppDispatch, useAppSelector} from "../../store.ts";
import {useEffect} from "react";
import {fetchAllCountries} from "../../slices/countries-slice.ts";
import {divIcon} from "leaflet";


export default function WorldMap() {
    const dispatch = useAppDispatch();
    const { allCountries, loading, error } = useAppSelector((state) => state.table);

    useEffect(() => {
        dispatch(fetchAllCountries());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Access the data property of rows and filter out countries with no coordinates
    const countries = allCountries?.filter((country: any) =>
        country.lat !== null &&
        country.lng !== null
    ) || [];

    const createFlagIcon = (flagUrl: string) => {
        return divIcon({
            className: 'custom-flag-icon',
            html: `<img src="${flagUrl}" alt="flag" />`,
            iconSize: [15, 15],  // width, height of the icon
            iconAnchor: [15, 10]  // position the icon correctly
        });
    };

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
                {countries.map((country: any) => (
                    console.log(country),
                    <Marker key={country.code} position={[country.lat, country.lng]} icon={createFlagIcon(country.flag)}>
                        <Popup>
                            <h3>{country.name}</h3>
                            <p>{country.code}</p>
                            <p>{country.description}</p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}