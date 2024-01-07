import { useState, Fragment } from 'react';
import { Box, useTheme, Typography, ButtonBase } from '@mui/material';
import Helpers from '../../libraries/Helpers';
import Topbar from '../global/Topbar';
import { colorTokens } from '../../theme';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tile from '../../components/Tile';
import BudgetTile from './BudgetTile';
const formatToDollar = Helpers.String.FormatToDollar.format;

export type BudgetItem = {
    category: string,
    label?: string,
    items: {
        [key: string]: number,
    },

};

const budget:BudgetItem[] = [
    {
        category: "income",
        items: {
            salary: 5_600,
            other: 0,
        }
    },
    {
        category: "expenses",
        items: {
            rent: 1_000,
            food: 500,
            utilities: 200,
            entertainment: 200,
            other: 100,
        }
    },
    {
        category: "savings",
        items: {
            emergency: 500,
            retirement: 500,
            other: 100,
        },
    },
    {
        category: "minimum_debt_repayments",
        items: {
            student_loans: 200,
            credit_card: 200,
            other: 100,
        },
    },
    {
        category: "other",
        label: "Other",
        items: {
            buffer: 100,
        },
    }
];
 
const AddTileButton = (props: {addTile: () => void} ) => {
    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    return (  
        <Tile 
            variant="primary"
            addTile={ props.addTile } 
            sx={{
                height:"15rem",
                width:"15rem",
                display: "flex",
                padding: "0", 
                '&:hover': {
                    backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.primary[700],
                    cursor: "pointer",
                },
                '&:hover > .MuiSvgIcon-root': {
                    color: theme.palette.mode === "dark" ? colors.primary[100] : colors.primary[800],
                },
                '&:active': {
                    backgroundColor: theme.palette.mode === "dark" ? colors.primary[600] : colors.primary[600],
                }
            }}>
            <ButtonBase sx={{display:"flex", width: "100%", height: "100%"}}>
                <AddCircleOutlineIcon sx={{ margin: "auto auto", height:"5rem", width: "5rem"}}/>
            </ButtonBase>
        </Tile>
    );
}

const BudgetApp = () => {
    
    const [ tiles, updateTiles ] = useState(budget.map((item, index) => <Fragment key={index}><BudgetTile budgetItem={item} /></Fragment>));
    const theme = useTheme(); 
    const colors = colorTokens(theme.palette.mode);

    const newBudgetItem: BudgetItem = {
        category: "other",
        label: "Other",
        items: {},
    };

    const handleAddTile = () => {
        const newTile = <BudgetTile budgetItem={newBudgetItem} key={tiles.length + 1} />;
        updateTiles(tiles.concat(newTile));
    };

    // grab the main categories
    const expenses = budget.find((item) => item.category === "expenses");
    const savings = budget.find((item) => item.category === "savings");
    const minimum_debt_repayments = budget.find((item) => item.category === "minimum_debt_repayments");
    const income = budget.find((item) => item.category === "income");

    // find the stats for the cateogories
    const totalExpenses = expenses ? Object.values(expenses.items).reduce((a, b) => a + b, 0) : 0;
    const totalSavings = savings ? Object.values(savings.items).reduce((a, b) => a + b, 0) : 0;
    const totalMinimumPayments = minimum_debt_repayments ? Object.values(minimum_debt_repayments.items).reduce((a, b) => a + b, 0) : 0;
    const totalIncome = income ? Object.values(income.items).reduce((a, b) => a + b, 0) : 0;
    const balance = totalIncome - totalExpenses - totalSavings - totalMinimumPayments;

    return (
        <Box>
            <Topbar title="Budget App" />
            <Tile variant="primary">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        maxWidth: "75vw",
                        margin: "20px auto 20px auto",
                    }}
                >
                    <Typography variant="h3">Income: {formatToDollar(totalIncome)}</Typography>
                    <Typography variant="h3">Expenses: {formatToDollar(totalExpenses)}</Typography>
                    <Typography variant="h3">Savings: {formatToDollar(totalSavings)}</Typography>
                    <Typography variant="h3">Debt: {formatToDollar(totalMinimumPayments)}</Typography>
                    <Typography variant="h3" color={ balance < 0 ? colors.redAccent[500] : colors.greenAccent[500]}>Balance: {formatToDollar(balance)}</Typography>
                </Box>
                <Tile
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                    }}
                >
                    {tiles}
                    <AddTileButton addTile={handleAddTile} />
                </Tile>
            </Tile>
        </Box>
    );
};

export default BudgetApp;