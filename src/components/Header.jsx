import React from "react";
import {
  HStack,
  Link,
  Box,
  Spacer,
  IconButton,
  Image
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();

  // Détection des pages
  const isDashboard = location.pathname === "/dashboard";
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <Box
      bg={isAuthPage ? "principal.100" : "principal.100"}

      px={6}
      py={4}
      boxShadow={isAuthPage ? "none" : "md"}
    >
      <HStack spacing={6} align="center">
        {/* Logo cliquable vers la page d’accueil (sauf login/register) */}
        {!isAuthPage && (
          <Link as={RouterLink} to="/dashboard">
            <Image src="/logo.svg" alt="Logo" boxSize="40px" />
          </Link>
        )}

        {/* Liens navigation */}
        {!isDashboard && !isAuthPage && (
          <>
            <Link
              as={RouterLink}
              to="/dashboard"
              fontWeight="bold"
              color="principal.500"
            >
              Accueil
            </Link>
            <Link
              as={RouterLink}
              to="/history"
              fontWeight="bold"
              color="principal.500"
            >
              Historique
            </Link>
            <Link
              as={RouterLink}
              to="/profile"
              fontWeight="bold"
              color="principal.500"
            >
              Profil
            </Link>
          </>
        )}

        <Spacer />

        {/* Bouton clair/sombre */}
        <IconButton
          aria-label="Toggle mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          mr={!isAuthPage ? 4 : 0}
        />

        {/* Déconnexion */}
        {!isAuthPage && (
          <Link as={RouterLink} to="/login" fontWeight="bold" color="red.500">
            Déconnexion
          </Link>
        )}
      </HStack>
    </Box>
  );
}
