import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import AmortizationApp from "./components/AmortizationTable/AmortizationApp"
import Header from "./components/Header"
import theme from "./theme"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Header />
    <Box pt="4rem" textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <AmortizationApp />
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
)
