import Topbar from "../global/Topbar"
import { useTheme } from '@mui/material/styles';
import { colorTokens } from "../../theme";
import { Box, Grid, Paper, Typography, Link } from '@mui/material';


type HomeCardProps = {
    label: string,
    to: string,
    theme: any,
    colors: any,
}

const HomeCard = (props: HomeCardProps) => {
    return (
        <Grid 
            item
            height="20vh"
            width="15vw"
            sx={{
                "& .MuiTypography-root": {
                    color: props.colors.primary[100],
                    textDecoration: "none",
                }
            }}
            >
            <Link href={props.to}>
            <Paper
                sx={{
                    ...props.theme.typography.body1,
                    boxShadow: props.theme.palette.mode === "dark" ? "0px 0px 10px 0px rgba(0,0,0,0.75)" : "0px 0px 10px 0px rgba(0,0,0,0.25)",
                    padding: props.theme.spacing(1),
                    textAlign: "center",
                    "&:hover": {
                        backgroundColor: props.theme.palette.mode === "dark" ? props.colors.primary[400] : props.colors.primary[900],
                        textDecoration: "none",
                    },
                }}
            >
                <Typography>{props.label}</Typography>
            </Paper>
            </Link>
        </Grid>
    );
}

const Home = () => {
    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);

    return (
        <Box>
            <Topbar title="Home" />
            <Grid 
                container
                spacing={2}
                display= "flex"
                flexWrap="wrap"
                margin="0 auto"
                maxWidth="90vw"
            >
                <HomeCard label="Amortization Calculator" theme={theme} colors={colors} to="/#/amortization" /> 
                <Grid item>
                    <HomeCard label="Compounding Interest Calculator" theme={theme} colors={colors} to="/#/compound-interest"/> 
                </Grid>
            </Grid> 
        </Box>
    )
};

export default Home;