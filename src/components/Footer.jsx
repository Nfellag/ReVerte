import { Box, Text, useColorMode } from "@chakra-ui/react";



export default function Footer() {

    const { colorMode } = useColorMode();

    return (

        <Box
            position="absolute"
            bottom="0"
            left="0"
            width="100%"
            bg={colorMode === "light" ? "rgba(255, 255, 255, 0.3)" : "rgba(26, 32, 44, 0.3)"}
            backdropFilter="blur(16px) saturate(180%)"
            borderTop="1px solid rgba(255, 255, 255, 0.15)"
            p={3}
            zIndex={1000}
            textAlign="center"
        >
            <Text fontWeight="bold" color={colorMode === "light" ? "black" : "white"}>
                Surveillez les îlots de chaleur pour mieux protéger votre environnement
            </Text>
        </Box>

    );
}
