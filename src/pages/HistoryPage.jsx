import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function History() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alertes, setAlertes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3001/api/alertes")
      .then((res) => res.json())
      .then((alertesData) => {
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

  // Tri par date décroissante (les plus récentes d'abord)
  const sortedAlertes = [...alertes].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <Box w="100vw" minH="100vh" display="flex" flexDirection="column">
      <Header />

      <Box flex="1" p={4} mt="80px">
        <Text fontSize="2xl" mb={4}>
          {id ? `Historique du capteur ${id}` : "Historique global"}
        </Text>

        {sortedAlertes.length === 0 ? (
          <Text>Aucune donnée pour le moment.</Text>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Capteur</Th>
                <Th>Type</Th>
                <Th>Valeur</Th>
                <Th>Date/Heure</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedAlertes.map((a, index) => (
                <Tr key={index} bg="red.200" fontWeight="bold">
                  <Td>{a.capteur_id}</Td>
                  <Td>{a.type}</Td>
                  <Td>{a.valeur}</Td>
                  <Td>{new Date(a.date).toLocaleString()}</Td>
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
