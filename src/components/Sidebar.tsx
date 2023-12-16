import {
    Box, Button, VStack,
} from '@chakra-ui/react'

  
const SidebarContent = () => (
    <VStack>
        <Button w="100%">Home</Button>
        <Button w="100%">About</Button>
        <Button w="100%">Contact</Button>
    </VStack>
)

const Sidebar = () => {
    return (
        <Box position="fixed" left={0} p={5} w="200px" top={0} h="100%"
            bg="#dfdfdf" // TODO: make this look good
        >
            <SidebarContent />
        </Box>
    )
}

export default Sidebar
