import {
  HStack,
  Link,
  Box,
  Spacer,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";

const logo = "/logo.svg"; // ✅ Correction : correspond au fichier dans public/

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname === "/dashboard";
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <Box
      bg={
        colorMode === "light"
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(26, 32, 44, 0.3)"
      }
      backdropFilter="blur(16px) saturate(180%)"
      borderBottom="1px solid rgba(255, 255, 255, 0.15)"
      px={6}
      py={4}
      boxShadow="sm"
      position="fixed"
      top={0}
      left={0}
      width="100%"
      zIndex={1000}
    >
      <HStack spacing={6} align="center">
        {!isAuthPage && (
          <Link as={RouterLink} to="/">
            <Image
              src={logo}
              alt="Logo ReVerte"
              boxSize="40px"
              cursor="pointer"
            />
          </Link>
        )}

        {!isAuthPage && (
          <>
            <Link
              as={RouterLink}
              to="/history/"
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

        <IconButton
          aria-label="Toggle mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          mr={!isAuthPage ? 4 : 0}
        />

        {!isAuthPage && (
          <Link as="button" onClick={handleLogout} fontWeight="bold" color="red.500">
            Déconnexion
          </Link>
        )}
      </HStack>
    </Box>
  );
}
