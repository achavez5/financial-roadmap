import {
    Button, VStack, Drawer, DrawerBody, DrawerHeader, 
    DrawerOverlay, DrawerContent, DrawerCloseButton, Link 
} from '@chakra-ui/react'

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

  
const SidebarContent = () => (
    <VStack>
        <Button w="100%"><Link href="/financial-roadmap/amortization">Amortization Calculator</Link></Button>
        <Button w="100%"><Link href="/financial-roadmap/compounding-interest">Compounding Interest Calculator</Link></Button>
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
