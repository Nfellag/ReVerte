
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    colors: {
        brand: {
            50: "#f5faff",
            100: "#e0f2ff",
            200: "#b8e2ff",
            300: "#81ceff",
            400: "#4ab8ff",
            500: "#1a9fff",
            600: "#007fe6",
            700: "#005fb4",
            800: "#004082",
            900: "#002251",
        },
    },
    fonts: {
        heading: `'Inter', sans-serif`,
        body: `'Inter', sans-serif`,
    },
})

export default theme
