import React from "react";
import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function DashboardPage() {
  return (
    <Box p={10} textAlign="center">
      <VStack spacing={6}>
        <Heading>Bienvenue sur ReVerte 🌱</Heading>
        <Text fontSize="lg" color="gray.600">
          Application de surveillance des îlots de chaleur urbains.
        </Text>
        <VStack spacing={4}>
          <Button as={RouterLink} to="/heatmap" colorScheme="blue">
            Voir la heatmap
          </Button>
          <Button as={RouterLink} to="/history" colorScheme="teal">
            Consulter l'historique
          </Button>
          <Button as={RouterLink} to="/zones" colorScheme="orange">
            Gérer les zones
          </Button>
          <Button as={RouterLink} to="/profile" colorScheme="purple">
            Mon profil
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
