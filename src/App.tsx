import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import AmortizationApp from "./components/AmortizationTable/AmortizationApp"
import theme from "./theme"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl" maxWidth="100dvw">
      <Grid minH="100dvh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <AmortizationApp />
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
)
