import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Select,
  Heading,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("homme");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.preferences.email === email)) {
      toast({
        title: "Erreur",
        description: "Cet email est déjà utilisé",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!name || !email || !password || !gender || age === "") {
      toast({
        title: "Erreur",
        description: "Merci de remplir tous les champs",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newUser = {
      nom: name,
      type: "citoyen",
      preferences: { email, password, gender, age },
      notifications: true,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("token", "fake-jwt-token");
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    toast({
      title: "Inscription réussie",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    navigate("/dashboard");
  };

  return (
    <Box p={10} textAlign="center">
      <VStack spacing={4}>
        <Heading>Inscription</Heading>
        <Input
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
        </Select>
        <Input
          type="number"
          placeholder="Âge"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleRegister}>
          S'inscrire
        </Button>
      </VStack>
    </Box>
  );
}
