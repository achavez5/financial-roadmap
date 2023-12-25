import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import {
  ChakraProvider,
  Box,
  VStack,
} from "@chakra-ui/react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import theme from "./theme"
import CompoundingInterestApp from "./components/CompoundingInterest"
import AmortizationApp from "./components/AmortizationTable"

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
          <BrowserRouter basename="financial-roadmap"> 
           <Routes> 
              <Route path="/" element={<AmortizationApp />}/>
              <Route path="/amortization" element={<AmortizationApp />}/>
              <Route path="/compounding-interest" element={<CompoundingInterestApp />}/>
            </Routes>
          </BrowserRouter>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}
