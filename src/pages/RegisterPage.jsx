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
  FormControl,
  FormLabel,
  Select,
  useColorModeValue
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.email === email)) {
      toast({
        title: "Erreur",
        description: "Cet email est déjà utilisé",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      return;
    }

    if (!name || !email || !password || !gender || age === "") {
      toast({
        title: "Erreur",
        description: "Merci de remplir tous les champs",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      return;
    }

    const newUser = { name, email, password, gender, age };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("token", "fake-jwt-token");
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    toast({
      title: "Inscription réussie",
      status: "success",
      duration: 2000,
      isClosable: true
    });

    navigate("/dashboard");
  };

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("principal.50", "gray.800")}
      display="flex"
      justifyContent="center"
      alignItems="center"
      pt="120px" // ✅ espace ajouté pour éviter que le formulaire colle au header
    >
      <VStack
        spacing={6}
        p={8}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="xl"
        borderRadius="2xl"
        w="100%"
        maxW="400px"
      >
        <Image src="/logo.svg" alt="Logo" boxSize="60px" />
        <Heading
          as="h1"
          fontSize="h1"
          fontFamily="heading"
          color={useColorModeValue("gray.900", "white")}
        >
          Inscription
        </Heading>

        <FormControl>
          <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
            Nom complet
          </FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            bg={useColorModeValue("gray.50", "gray.600")}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
            Email
          </FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            bg={useColorModeValue("gray.50", "gray.600")}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
            Mot de passe
          </FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bg={useColorModeValue("gray.50", "gray.600")}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
            Confirmer mot de passe
          </FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            bg={useColorModeValue("gray.50", "gray.600")}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
            Genre
          </FormLabel>
          <Select
            placeholder="Sélectionner un genre"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            bg={useColorModeValue("gray.50", "gray.600")}
          >
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
            <option value="autre">Autre</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
            Âge
          </FormLabel>
          <Input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            bg={useColorModeValue("gray.50", "gray.600")}
          />
        </FormControl>

        <Button
          color="white"
          bg="principal.500"
          _hover={{ bg: "principal.400" }}
          onClick={handleRegister}
          w="100%"
        >
          S'inscrire
        </Button>

        <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.300")}>
          Déjà inscrit ?{" "}
          <a href="/login" style={{ color: "#1A75FF" }}>
            Connexion
          </a>
        </Text>
      </VStack>
    </Box>
  );
}
