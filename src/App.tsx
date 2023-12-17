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

export const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return  (
    <ChakraProvider theme={theme}>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar}/>
      <Box ml="0" alignContent={"center"} >
        <Header onShowSidebar={toggleSidebar} />
        <VStack spacing={8} textAlign="center" pt={"8rem"}>
          <AmortizationApp/>
        </VStack>
      </Box>
</ChakraProvider>
  );
}
