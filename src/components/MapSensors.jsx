export default function MapSensors() {
    const [sensors, setSensors] = useState([]);

    useEffect(() => {
        fetch("/api/sensors")
            .then(res => res.json())
            .then(data => setSensors(data))
            .catch(err => console.error(err));
    }, []);

    const sensorIcon = new L.Icon({
        iconUrl: "/icons/sensor.svg",
        iconSize: [35, 35],
    });

    return (
        <MapContainer center={[48.8566, 2.3522]} zoom={12} scrollWheelZoom={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy;
            <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap</a>' />

            {sensors.map(sensor => (
                <Marker
                    key={sensor.id}
                    position={[sensor.latitude, sensor.longitude]}
                    icon={sensorIcon}
                >
                    <Popup>
                        <div>
                            <h3>Capteur {sensor.id}</h3>
                            <p>Température : {sensor.temperature}°C</p>
                            <p>Humidité : {sensor.humidite}%</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
