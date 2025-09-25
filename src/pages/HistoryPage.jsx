import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function History() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [alertes, setAlertes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    let fetchHistory;
    if (id) {
      fetchHistory = fetch(`/api/sensors/${id}/history`).then((res) =>
        res.json()
      );
    } else {
      fetchHistory = fetch("/api/sensors/history").then((res) => res.json());
    }

    const fetchAlertes = fetch("http://localhost:5000/api/alertes").then((res) =>
      res.json()
    );

    Promise.all([fetchHistory, fetchAlertes])
      .then(([historyData, alertesData]) => {
        setHistory(historyData || []);
        if (id) {
          setAlertes(alertesData.filter((a) => a.capteur_id === id));
        } else {
          setAlertes(alertesData || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) return <Text p={4}>Chargement...</Text>;

  const combinedData = [
    ...history.map((h) => ({ ...h, type: "history" })),
    ...alertes.map((a) => ({
      temperature: "-",
      humidite: "-",
      timestamp: a.date,
      message: `${a.type} : ${a.valeur}`,
      type: "alerte",
    })),
  ];

  combinedData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <Box w="100vw" minH="100vh" display="flex" flexDirection="column">
      <Header />

      <Box flex="1" p={4} mt="80px">
        <Text fontSize="2xl" mb={4}>
          {id ? `Historique du capteur ${id}` : "Historique global"}
        </Text>

        {combinedData.length === 0 ? (
          <Text>Aucune donnée pour le moment.</Text>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Température (°C)</Th>
                <Th>Humidité (%)</Th>
                <Th>Date/Heure</Th>
                <Th>Message</Th>
              </Tr>
            </Thead>
            <Tbody>
              {combinedData.map((entry, index) => (
                <Tr
                  key={index}
                  bg={entry.type === "alerte" ? "red.200" : "transparent"}
                  fontWeight={entry.type === "alerte" ? "bold" : "normal"}
                >
                  <Td>{entry.temperature}</Td>
                  <Td>{entry.humidite}</Td>
                  <Td>{new Date(entry.timestamp).toLocaleString()}</Td>
                  <Td>{entry.type === "alerte" ? entry.message : ""}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>

      <Footer />
    </Box>
  );
}
