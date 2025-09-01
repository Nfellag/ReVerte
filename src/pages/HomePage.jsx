import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import Header from "../components/Header";
import Footer from "../components/Footer";


const heatIcon = new L.Icon({
    iconUrl: "/icons/icons8-heat-100.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28],
});

const sensorIcon = new L.Icon({
    iconUrl: "/icons/icons8-sensor-50.png",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -28],
});

const IDF_CENTER = [48.8566, 2.3522];

export default function HomePage() {
    const [hotspots, setHotspots] = useState([]);
    const [sensors, setSensors] = useState([]);
    const [alertes, setAlertes] = useState([]);


    useEffect(() => {
        const fetchHotspots = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/hotspots");
                const data = await res.json();
                console.log("✅ Hotspots reçus :", data);
                setHotspots(data);
            } catch (e) {
                console.error("❌ Erreur fetch hotspots:", e);
            }
        };
        fetchHotspots();
    }, []);


    useEffect(() => {
        const fetchSensors = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/sensors");
                const data = await res.json();
                console.log("✅ Sensors reçus (avant filtrage):", data);

                const validSensors = data.filter((s) => s.latitude && s.longitude);
                console.log("✅ Sensors valides (avec coordonnées):", validSensors);

                setSensors(validSensors);
            } catch (e) {
                console.error("❌ Erreur fetch sensors:", e);
            }
        };
        fetchSensors();
    }, []);


    useEffect(() => {
        const fetchAlertes = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/alertes");
                const data = await res.json();
                console.log("✅ Alertes reçues :", data);
                setAlertes(data);
            } catch (e) {
                console.error("❌ Erreur fetch alertes:", e);
            }
        };
        fetchAlertes();
    }, []);

    return (
        <Box w="100vw" h="100vh" display="flex" flexDirection="column">
            <Header />

            <Box flex="1" position="relative">
                <MapContainer
                    center={IDF_CENTER}
                    zoom={11}
                    style={{ width: "100%", height: "100%" }}
                    zoomControl={false}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    <ZoomControl position="bottomright" />


                    {hotspots.map((spot) => (
                        <Marker
                            key={"hotspot-" + spot.id}
                            position={[spot.lat, spot.lon]}
                            icon={heatIcon}
                        >
                            <Popup>
                                <b>{spot.name}</b> <br />
                                🌡️ {spot.temperature_c} °C <br />
                                💧 {spot.humidity_pct} % <br />
                                {spot.observed_at && (
                                    <>⏱️ {new Date(spot.observed_at).toLocaleString()}</>
                                )}
                            </Popup>
                        </Marker>
                    ))}


                    {sensors.map((sensor) => {
                        const sensorAlertes = alertes.filter(
                            (a) => a.sensorId === sensor.id
                        );
                        return (
                            <Marker
                                key={"sensor-" + sensor.id}
                                position={[sensor.latitude, sensor.longitude]}
                                icon={sensorIcon}
                            >
                                <Popup>
                                    <b>Capteur {sensor.id}</b> <br />
                                    🌡️ {sensor.temperature} °C <br />
                                    💧 {sensor.humidite} % <br />
                                    {sensor.timestamp && (
                                        <>
                                            ⏱️ {new Date(sensor.timestamp).toLocaleString()}
                                            <br />
                                        </>
                                    )}
                                    {sensorAlertes.length > 0 && (
                                        <>
                                            <b>Alertes :</b>
                                            <ul>
                                                {sensorAlertes.map((a) => (
                                                    <li key={a.id}>
                                                        {a.message} -{" "}
                                                        {new Date(a.date).toLocaleString()}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </Box>

            <Footer />
        </Box>
    );
}
