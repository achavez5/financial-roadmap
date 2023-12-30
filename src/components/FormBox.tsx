import React from "react";
import { Box, useTheme } from "@mui/material";
import { colorTokens } from "../theme";

type FormBoxProps = {
    children: React.ReactNode[],
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
}

const FormBox = ({children, handleSubmit} : FormBoxProps) => {
    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);

    const inputHighlightColor = theme.palette.mode === "dark" ? colors.grey[200] : "";
    
    return <Box
        component="form"
        borderRadius="4px"
        id="compounding-box"
        boxShadow={theme.palette.mode === "dark" ? "0px 0px 10px 0px rgba(0,0,0,0.75)" : "0px 0px 10px 0px rgba(0,0,0,0.25)"}
        maxWidth="30vw"
        minWidth="325px"
        margin="0 auto"
        padding="20px"
        gap="15px"
        display="flex"
        flexWrap="wrap"
        onSubmit={handleSubmit}
        sx={{ 
            '& label.Mui-focused': {
                color: inputHighlightColor,
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: inputHighlightColor,
            },
            '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                    borderColor: inputHighlightColor,
                    borderWidth: "1px"
                },
                '&.Mui-focused fieldset': {
                    borderColor: inputHighlightColor,
                    borderWidth: "1px"
                },
            },
        }}
    >
        {children}
    </Box>
}

export default FormBox; 