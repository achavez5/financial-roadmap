import { useState } from "react"

import {
  ChakraProvider,
  Box,
  VStack,
} from "@chakra-ui/react"
import AmortizationApp from "./components/AmortizationTable/AmortizationApp"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import theme from "./theme"
import CompoundingInterestApp from "./components/CompoundingInterestCalculator/CompoundingInterestApp"

export const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return  (
    <ChakraProvider theme={theme}>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar}/>
      <Box textAlign="center" fontSize="xl" maxWidth="100dvw">
        <Header onShowSidebar={toggleSidebar} />
        <VStack spacing={8} pt="75px" id="app-vstack">
           {/* <AmortizationApp /> */}
           <CompoundingInterestApp />
        </VStack>
      </Box>
    </ChakraProvider>
  );
}
