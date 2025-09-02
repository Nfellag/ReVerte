import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Avatar,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  useToast,
  Text,
  useColorModeValue
} from "@chakra-ui/react";

export default function ProfilePage() {
  // Infos utilisateur
  const [name, setName] = useState("John");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+33760504754");
  const [photo, setPhoto] = useState(null);

  // Préférences de notifications
  const [type, setType] = useState("all");
  const [frequency, setFrequency] = useState("instant");
  const [channel, setChannel] = useState("email");

  const toast = useToast();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      // Simulation d’API
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, type, frequency, channel }),
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour");

      toast({
        title: "Profil mis à jour",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Simulations météo
  const temperature = 28;
  const humidity = 45;

  // 🎨 couleurs adaptatives
  const bgPage = useColorModeValue("principal.50", "gray.800");
  const bgCard = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.900", "white");
  const inputBg = useColorModeValue("gray.50", "gray.600");
  const labelColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Box minH="100vh" bg={bgPage} py={10} px={4} display="flex" justifyContent="center">
      <VStack
        spacing={8}
        p={8}
        bg={bgCard}
        boxShadow="xl"
        borderRadius="2xl"
        w="100%"
        maxW="600px"
        color={textColor}
        align="stretch"
      >
        {/* --- Section Profil --- */}
        <Heading as="h1" fontSize="2xl" fontFamily="heading" color={textColor}>
          Mon Profil
        </Heading>

        <Avatar size="xl" src={photo || "/logo.svg"} />
        <Button
          as="label"
          htmlFor="photo-upload"
          bg="principal.500"
          color="white"
          _hover={{ bg: "principal.400" }}
        >
          Changer la photo
        </Button>
        <Input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          display="none"
        />

        <FormControl>
          <FormLabel color={labelColor}>Nom complet</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} bg={inputBg} />
        </FormControl>

        <FormControl>
          <FormLabel color={labelColor}>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} bg={inputBg} />
        </FormControl>

        <FormControl>
          <FormLabel color={labelColor}>Téléphone</FormLabel>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} bg={inputBg} />
        </FormControl>

        {/* --- Section Notifications --- */}
        <Heading as="h2" size="md" color={textColor}>
          Préférences de notifications
        </Heading>

        <FormControl>
          <FormLabel color={labelColor}>Type</FormLabel>
          <Select value={type} onChange={(e) => setType(e.target.value)} bg={inputBg}>
            <option value="all">Toutes</option>
            <option value="temp">Température</option>
            <option value="humidity">Humidité</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel color={labelColor}>Fréquence</FormLabel>
          <Select value={frequency} onChange={(e) => setFrequency(e.target.value)} bg={inputBg}>
            <option value="instant">Instantanée</option>
            <option value="daily">Quotidienne</option>
            <option value="weekly">Hebdomadaire</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel color={labelColor}>Canal</FormLabel>
          <Select value={channel} onChange={(e) => setChannel(e.target.value)} bg={inputBg}>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="push">Notification push</option>
          </Select>
        </FormControl>

        {/* --- Section Météo --- */}
        <Heading as="h2" size="md" color={textColor}>
          Informations météo
        </Heading>
        <Box
          bg={useColorModeValue("gray.100", "gray.600")}
          p={4}
          borderRadius="lg"
          textAlign="center"
        >
          <Text fontSize="lg" color={textColor}>
            🌡 Température : {temperature}°C
          </Text>
          <Text fontSize="lg" color={textColor}>
            💧 Humidité : {humidity}%
          </Text>
        </Box>

        {/* Bouton Sauvegarder */}
        <Button
          color="white"
          bg="principal.500"
          _hover={{ bg: "principal.400" }}
          onClick={handleSave}
        >
          Sauvegarder
        </Button>
      </VStack>
    </Box>
  );
}
