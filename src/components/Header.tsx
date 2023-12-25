import { Box, HStack, useColorModeValue, Button, useBreakpointValue } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { ColorModeSwitcher } from "../ColorModeSwitcher"

type HeaderProps = {
  onShowSidebar: () => void;
};

export type AppVariant = {
  size: number,
}

const Header = ( { onShowSidebar } : HeaderProps) => {
  
  const smVariant:AppVariant = { size: 1 };
  const mdVariant:AppVariant = { size: 1 };
  const lgVariant:AppVariant = { size: 2 };
  const xlVariant:AppVariant = { size: 3 };
  const variant = useBreakpointValue({ base: smVariant, sm:smVariant, md: mdVariant, lg: lgVariant, xl: xlVariant });

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
      backgroundColor={useColorModeValue("var(--chakra-colors-chakra-body-bg)", "var(--chakra-colors-chakra-body-bg)")}
      zIndex={200} // fixes the header navigation bar to the top of all elements
      width="100dvw" // fixes the header navigation bar from having elements jump around on sidebar open and close
                     // This fix is because of the scrollbar. it disappears when the side bar is open and reappears when closed
    >
      <Box maxWidth="1280px" mx="auto">
        <HStack
          px={16}
          py={variant?.size || 4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <Button onClick={onShowSidebar} >
              <HamburgerIcon />
            </Button>          
          </nav>
          <nav/> 
          <nav>
            <ColorModeSwitcher/>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
