import { Box, IconButton, useTheme, Typography} from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext } from '../../theme';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"; 
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

type TopbarProps = {
  title?: string,
}

const Topbar = (props: TopbarProps) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Typography variant="h2">{props.title || ""}</Typography>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (<DarkModeOutlinedIcon />) : (<LightModeOutlinedIcon />)}
        </IconButton>
      </Box>
    </Box>  
  );

};
export default Topbar;
