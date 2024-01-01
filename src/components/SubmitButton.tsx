import { Button, useTheme } from "@mui/material";
import { colorTokens } from "../theme";

type SubmitProps = {
    label: string,
    scrollToId?: string, 
};

const SubmitButton = ({label, scrollToId=""}: SubmitProps) => {
    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    
    return (
        <Button 
            variant="contained" 
            sx={{background: colors.blueAccent[500], width:"100%"}}
            type="submit"
        >
            {label}
        </Button>
    )
}

export default SubmitButton; 