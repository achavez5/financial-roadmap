import { Box, HStack, useColorModeValue, Image, Button } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import logo from "../images/placeholderLogo.png"; // TODO: get a logo
import { ColorModeSwitcher } from "../ColorModeSwitcher"

type HeaderProps = {
  onShowSidebar: () => void;
};


const Header = ( { onShowSidebar}: HeaderProps) => {

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor={useColorModeValue("cyan.700", "cyan.900")}
      zIndex={200} // fixes the header navigation bar to the top of all elements
      width="100dvw" // fixes the header navigation bar from having elements jump around on sidebar open and close
                     // This fix is because of the scrollbar. it disappears when the side bar is open and reappears when closed
    >
      <Box maxWidth="1280px" mx="auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <Button onClick={onShowSidebar} >
              <HamburgerIcon />
            </Button>          
          </nav>
          <Image src={logo} boxSize="1.5em"/>
          <nav>
            <ColorModeSwitcher color="white"/>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
