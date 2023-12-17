import {
    Button, VStack, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton 
} from '@chakra-ui/react'

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

  
const SidebarContent = () => (
    <VStack>
        <Button w="100%">Home</Button>
        <Button w="100%">About</Button>
        <Button w="100%">Contact</Button>
    </VStack>
)

const Sidebar = ( {isOpen, onClose} : SidebarProps) => {
    return (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Financial tools</DrawerHeader>
                <DrawerBody>
                    <SidebarContent />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default Sidebar
