import React, { useState, useEffect } from "react";
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

export default function ProfilePage() {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
    nom: "John Doe",
    email: "john@example.com",
    age: 30,
    gender: "homme",
    password: "",
  };

  const [name, setName] = useState(currentUser.nom);
  const [email, setEmail] = useState(currentUser.email);
  const [gender, setGender] = useState(currentUser.gender);
  const [age, setAge] = useState(currentUser.age);

  const handleSave = () => {
    const updatedUser = {
      ...currentUser,
      nom: name,
      email,
      gender,
      age,
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const idx = users.findIndex((u) => u.email === currentUser.email);
    if (idx !== -1) {
      users[idx] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }

    toast({
      title: "Profil mis à jour",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={10} textAlign="center">
      <VStack spacing={4}>
        <Heading>Mon profil</Heading>
        <Input placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
        </Select>
        <Input type="number" placeholder="Âge" value={age} onChange={(e) => setAge(e.target.value)} />
        <Button colorScheme="green" onClick={handleSave}>Sauvegarder</Button>
      </VStack>
    </Box>
  );
}
