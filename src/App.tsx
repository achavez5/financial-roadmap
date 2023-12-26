import { useState } from "react"
import { HashRouter, Routes, Route } from "react-router-dom"

import {
  ChakraProvider,
  Box,
  VStack,
} from "@chakra-ui/react"
import Header from "./scenes/global/Header"
import Sidebar from "./scenes/global/Sidebar"
import theme from "./theme"
import CompoundingInterestApp from "./scenes/compounding-interest"
import AmortizationApp from "./scenes/amortization-table"

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
          <HashRouter basename="/"> 
           <Routes> 
              <Route path="/" element={<AmortizationApp />}/>
              <Route path="/amortization" element={<AmortizationApp />}/>
              <Route path="/compounding-interest" element={<CompoundingInterestApp />}/>
            </Routes>
          </HashRouter>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}
