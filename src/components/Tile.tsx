import { Box, useTheme } from '@mui/material';


type TileProps = {
    children?: React.ReactNode[] | React.ReactNode,
    sx?: any,
    variant?: "primary" | "secondary",
    addTile?: () => void,
}

const Tile = (props: TileProps) => {
    const theme = useTheme();
    const boxShadow = theme.palette.mode === "dark" ? "0px 0px 10px 0px rgba(0,0,0,0.75)" : "0px 0px 10px 0px rgba(0,0,0,0.25)";
    const borderRadius = "4px";
    
    return (
        <Box
            onClick={props.addTile}
            sx={{
                margin: "0 20px 0 20px",
                padding : "20px",
                boxShadow: boxShadow,
                borderRadius: borderRadius,
                ...props.sx, // properties to override the default styling
            }}
        >
            {props.children}
        </Box>
    );
};

export default Tile;