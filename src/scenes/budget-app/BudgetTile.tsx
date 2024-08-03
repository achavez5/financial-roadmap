import { Box, TextField, Typography, Button, useTheme } from '@mui/material';
import Tile from '../../components/Tile';
import { BudgetItem }  from './index';
import { colorTokens } from '../../theme';
import Helpers from '../../libraries/Helpers';
const formatToDollar = Helpers.String.FormatToDollar.format;

const transformKey = (word: string) => {
    return Helpers.String.CapitalizeFirstCharacterOfWord(word).replace(/_/g, " "); 
}

type BudgetTileProps = {
    budgetItem: BudgetItem,
    // key: number,
}
type DeleteButtonProps = {
    variant?: string,
}

const DeleteButton = ({variant}: DeleteButtonProps) => {
    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);

    return (
        <Button
            sx={{
                '&:hover': {
                    backgroundColor: theme.palette.mode === "dark" ? colors.primary[300] : colors.primary[700],
                    cursor: "pointer",
                },
                '&:hover > .MuiSvgIcon-root': {
                    color: theme.palette.mode === "dark" ? colors.primary[100] : colors.primary[800],
                },
                '&:active': {
                    backgroundColor: theme.palette.mode === "dark" ? colors.primary[600] : colors.primary[600],
                },
                color: theme.palette.mode === "dark" ? colors.primary[100] : colors.primary[900],
                backgroundColor: variant === "primary" ? (theme.palette.mode === "dark" ? colors.grey[900] : colors.grey[300]) : "",
            }}
        >X</Button>
    );
};

const TitleBar = ({ budgetItem }: {budgetItem: BudgetItem}) => {

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Typography variant="h3">{transformKey(budgetItem.category || "")}</Typography>
            <Box display="flex">
                <DeleteButton variant="primary"></DeleteButton>
            </Box>
        </Box>
    );
};

const TileLine = ({ budgetItem }: { budgetItem: BudgetItem }) => {
    return (<>
        <Box >
            {Object.entries(budgetItem?.items || []).map(([_key, value]) => (
                <Box display="flex" key={_key} gap={"10px"} marginBottom="20px" marginTop="20px">
                    <TextField 
                        placeholder={transformKey(_key)} 
                        variant="standard" 
                        autoComplete="off" 
                        sx={{
                            '& .MuiInputBase-input': { 
                                fontSize: "1rem",
                        }}
                    }/>
                    <Typography sx={{
                        margin: "auto 0", 
                        fontSize: "1rem"
                    }}>
                        :
                    </Typography>
                    <TextField 
                        placeholder={formatToDollar(value)}
                        variant="standard"
                        autoComplete="off"
                        sx={{'& .MuiInputBase-input': { 
                                fontSize: "1rem",
                            }
                        }}/>
                    <DeleteButton variant="secondary"></DeleteButton>
                </Box>
            ))}
        </Box>
    </>);
}

const BudgetTile = ({ budgetItem }: BudgetTileProps) => {
    return ( 
        <Tile variant="primary" sx={{ maxWidth:"100%", marginBottom: "20px" }}>
            <TitleBar budgetItem={budgetItem}/>
            <TileLine budgetItem={budgetItem}></TileLine>
        </Tile>
    );
};

export default BudgetTile;