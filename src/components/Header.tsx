import { Box, HStack, useColorModeValue, Image, Tooltip } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import logo from "../images/placeholderLogo.png"; // TODO: get a logo
import { ColorModeSwitcher } from "../ColorModeSwitcher"

const Header = () => {

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
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack>
              {/**  TODO: Work on transition when this gets clicked when sidebar is figured out */}
              <Tooltip label={`I don't do anything yet`} placement='right-start'>
                <span><ArrowForwardIcon /></span> 
              </Tooltip>
            </HStack>
          </nav>
          <Image src={logo} boxSize="1.5em"/>
          <nav>
            {/**TODO: figure out what goes here */}
            <ColorModeSwitcher justifySelf="flex-end" />
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
