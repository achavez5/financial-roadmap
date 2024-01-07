import { Box, TextField, Typography } from '@mui/material';
import Tile from '../../components/Tile';
import { BudgetItem }  from './index';
import Helpers from '../../libraries/Helpers';
const formatToDollar = Helpers.String.FormatToDollar.format;

const transformKey = (word: string) => {
    return Helpers.String.CapitalizeFirstCharacterOfWord(word).replace(/_/g, " "); 
}

type BudgetTileProps = {
    budgetItem: BudgetItem,
    // key: number,
}

const BudgetTile = ({ budgetItem }: BudgetTileProps) => {
    return ( 
        <Tile variant="primary" sx={{width:"15rem", height:"15rem", marginBottom: "20px"}}>
            {budgetItem.label 
                ? <TextField
                    placeholder={transformKey(budgetItem.label)}
                    variant="standard"
                    autoComplete='off'
                    sx={{
                        marginBottom: "20px",
                        '& .MuiInputBase-input': {
                            fontSize: "1.5rem",
                        },
                    }}
                />
                : <Typography fontSize="1.5rem" sx={{marginBottom: "20px"}}>{transformKey(budgetItem.category)}</Typography> }
            <Box >
                {Object.entries(budgetItem?.items || []).map(([_key, value]) => (
                    <Box display="flex" key={_key}>
                        <TextField placeholder={transformKey(_key)} variant="standard" autoComplete="off" sx={{
                            '& .MuiInputBase-input': { 
                                fontSize: "0.75rem", 
                            }
                        }}/>
                        <Typography sx={{margin: "auto 0", fontSize: "0.75"}}>:</Typography>
                        <TextField placeholder={formatToDollar(value)} variant="standard" autoComplete="off" sx={{'& .MuiInputBase-input': { fontSize: "0.75rem", flexGrow: 4 }}}/>
                    </Box>

                ))}
            </Box>
        </Tile>
    );
};

export default BudgetTile;