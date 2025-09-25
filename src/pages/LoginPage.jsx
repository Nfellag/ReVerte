import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.preferences.email === email && u.preferences.password === password
    );

    if (!user) {
      toast({
        title: "Erreur",
        description: "Identifiants invalides",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    localStorage.setItem("token", "fake-jwt-token");
    localStorage.setItem("currentUser", JSON.stringify(user));

    toast({
      title: "Connexion réussie",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    navigate("/dashboard");
  };

  return (
    <Box p={10} textAlign="center">
      <VStack spacing={4}>
        <Heading>Connexion</Heading>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleLogin}>
          Se connecter
        </Button>

        <Text>Pas encore de compte ?</Text>
        <Button colorScheme="green" variant="outline" onClick={() => navigate("/register")}>
          S'inscrire
        </Button>
      </VStack>
    </Box>
  );
}
