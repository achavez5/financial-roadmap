import { Box, TextField, Typography, ButtonBase } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

import Tile from '../../components/Tile';
import { BudgetTileData }  from './index';
import Helpers from '../../libraries/Helpers';
import { LoginTwoTone } from '@mui/icons-material';
const formatToDollar = Helpers.String.FormatToDollar.format;

const transformKey = (word: string) => {
    return Helpers.String.CapitalizeFirstCharacterOfWord(word).replace(/_/g, " "); 
}

type BudgetTileProps = {
    budgetItem: BudgetTileData,
    // key: number,
}

const TitleBar = ({ budgetItem }: {budgetItem: BudgetTileData}) => {

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Typography variant="h3">{transformKey(budgetItem.category || "")}</Typography>
            <Box display="flex">
                <ButtonBase>
                    <CloseIcon />
                </ButtonBase>
            </Box>
        </Box>
    );
};

const TileLine = ({ budgetItem }: { budgetItem: BudgetTileData }) => {
    const addItem = () => {
        return true;
    };

    return (<>
        <Box >
            {budgetItem?.items.map(({key, value}) => (
                <Box display="flex" key={key} gap={"10px"} marginBottom="20px" marginTop="20px">
                    <TextField 
                        placeholder={transformKey(key)} 
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
                    <ButtonBase><CloseIcon fontSize="small"/></ButtonBase>
                    <ButtonBase onClick={addItem}><AddIcon fontSize="small"/></ButtonBase>
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