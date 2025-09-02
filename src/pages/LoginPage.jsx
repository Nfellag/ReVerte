import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  Text,
  useToast,
  Image,
  useColorModeValue
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

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

    navigate("/dashboard"); // 🔥 redirection propre
  };

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("principal.50", "gray.800")}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack
        spacing={6}
        p={8}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="xl"
        borderRadius="2xl"
      >
        <Image src="/logo.svg" alt="Logo" boxSize="60px" />
        <Heading as="h1" fontSize="h1" fontFamily="heading" color={useColorModeValue("gray.900", "white")}>
          Connexion
        </Heading>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          bg={useColorModeValue("gray.50", "gray.600")}
        />
        <Input
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          bg={useColorModeValue("gray.50", "gray.600")}
        />
        <Button color="white" bg="principal.500" _hover={{ bg: "principal.400" }} onClick={handleLogin}>
          Se connecter
        </Button>
        <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.300")}>
          Pas encore de compte ?{" "}
          <a href="/register" style={{ color: "#1A75FF" }}>
            Inscription
          </a>
        </Text>
      </VStack>
    </Box>
  );
}
