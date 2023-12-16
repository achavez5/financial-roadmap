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
  return  (
    <ChakraProvider theme={theme}>
      <Sidebar/>
      <Box ml="false" alignContent={"center"} pl="200px">
        <Header /**onShowSidebar={toggleSidebar} showSidebarButton={isSidebarOpen}*/ />
        <VStack spacing={8} textAlign="center" pt={"8rem"}>
          <AmortizationApp/>
        </VStack>
      </Box>
</ChakraProvider>
  );
}
