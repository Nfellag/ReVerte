import React from "react";
import {
  Box,
  Heading,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue
} from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function HistoryPage() {
  // 📊 Données simulées
  const data = {
    labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    datasets: [
      {
        label: "Température (°C)",
        data: [22, 24, 27, 29, 31, 28, 25],
        borderColor: "#1A75FF",
        backgroundColor: "rgba(26,117,255,0.2)",
      },
      {
        label: "Humidité (%)",
        data: [40, 42, 38, 35, 30, 45, 50],
        borderColor: "#FF4D29",
        backgroundColor: "rgba(255,77,41,0.2)",
      },
    ],
  };

  const alerts = [
    { id: 1, date: "2025-08-10", type: "Température", valeur: "35°C", intensite: "Élevée" },
    { id: 2, date: "2025-08-12", type: "Humidité", valeur: "20%", intensite: "Critique" },
  ];

  // 🎨 Styles mode clair/sombre
  const bgBox = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const tableHeaderBg = useColorModeValue("gray.100", "gray.600");

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("principal.50", "gray.800")}
      p={8}
    >
      <Heading mb={6} color={textColor}>
        Historique des mesures
      </Heading>
      <VStack spacing={8} align="stretch">
        {/* 📊 Graphique */}
        <Box bg={bgBox} p={6} borderRadius="lg" boxShadow="md">
          <Line data={data} />
        </Box>

        {/* 🚨 Tableau des alertes */}
        <Box bg={bgBox} p={6} borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={4} color={textColor}>
            Alertes récentes
          </Heading>
          <Table variant="simple">
            <Thead bg={tableHeaderBg}>
              <Tr>
                <Th color={textColor}>Date</Th>
                <Th color={textColor}>Type</Th>
                <Th color={textColor}>Valeur</Th>
                <Th color={textColor}>Intensité</Th>
              </Tr>
            </Thead>
            <Tbody>
              {alerts.map((a) => (
                <Tr key={a.id}>
                  <Td color={textColor}>{a.date}</Td>
                  <Td color={textColor}>{a.type}</Td>
                  <Td color={textColor}>{a.valeur}</Td>
                  <Td color={textColor}>{a.intensite}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
}
