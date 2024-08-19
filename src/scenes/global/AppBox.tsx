import { Box, styled } from "@mui/material";
import { colorTokens } from "../../theme";

const AppBox = styled(Box)(({ theme }) => {
    const colors = colorTokens(theme.palette.mode);
    return {
    }
});

export default AppBox;