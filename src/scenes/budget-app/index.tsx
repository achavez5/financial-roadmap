import { useState, Fragment } from 'react';
import { Box, useTheme, Typography, ButtonBase } from '@mui/material';
import Helpers from '../../libraries/Helpers';
import Topbar from '../global/Topbar';
import { colorTokens } from '../../theme';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tile from '../../components/Tile';
import BudgetTile from './BudgetTile';
const formatToDollar = Helpers.String.FormatToDollar.format;

export type BudgetItem = 
{
    key: string,
    value: number
};

export type BudgetTileData = {
    category: string,
    label?: string,
    items: BudgetItem[]
};

const budget: BudgetTileData[] = [
    {
        category: "income",
        items: [
            { key: "salary", value: 5_600 },
            { key: "other", value: 0 }
        ]
    },
    {
        category: "expenses",
        items: [
            { key: "rent", value: 1_000 },
            { key: "food", value: 500 },
            { key: "utilities", value: 200 },
            { key: "entertainment", value: 200 },
            { key: "other", value: 100 }
        ]
    },
    {
        category: "savings",
        items: [
            { key: "emergency", value: 500 },
            { key: "retirement", value: 500 },
            { key: "other", value: 100 },
        ],
    },
    {
        category: "minimum_debt_repayments",
        items: [
            { key: "student_loans", value: 200 },
            { key: "credit_card", value: 200 },
            { key: "other", value: 100 }
        ]
    },
    {
        category: "other",
        label: "Other",
        items: [
            { key: "buffer", value: 100 },
        ],
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
                minHeight: "5rem", 
                minWidth: "15rem",
                width:"100%",
                background: "transparent",
                boxShadow: "none",
                marginBottom: "20px",
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
            <ButtonBase disableRipple sx={{display:"flex", width: "100%", height: "100%"}}>
                <AddCircleOutlineIcon sx={{ margin: "auto auto", height:"5rem", maxWidth: "100%", width: "2rem"}}/>
            </ButtonBase>
        </Tile>
    );
}

const BudgetApp = () => {
    
    const [ budgetTiles, updateTiles ] = useState(budget.map((item, index) => <Fragment key={index}><BudgetTile budgetItem={item} /></Fragment>));
    const theme = useTheme(); 
    const colors = colorTokens(theme.palette.mode);

    const newBudgetItem: BudgetTileData = {
        category: "other",
        label: "Other",
        items: [
            { key: "Other", value: 0 },
        ],
    };

    const handleAddTile = () => {
        const newTile = <BudgetTile budgetItem={structuredClone(newBudgetItem)} key={budgetTiles.length + 1} />;
        updateTiles(budgetTiles.concat(newTile));
    };

    // grab the main categories
    const expenses = budget.find((item) => item.category === "expenses");
    const savings = budget.find((item) => item.category === "savings");
    const minimum_debt_repayments = budget.find((item) => item.category === "minimum_debt_repayments");
    const income = budget.find((item) => item.category === "income");

    // find the stats for the cateogories
    const totalExpenses = expenses ? expenses.items.reduce((a, b) => a + b.value, 0) : 0;
    const totalSavings = savings ? savings.items.reduce((a, b) => a + b.value, 0) : 0;
    const totalMinimumPayments = minimum_debt_repayments ? minimum_debt_repayments.items.reduce((a, b) => a + b.value, 0) : 0;
    const totalIncome = income ? income.items.reduce((a, b) => a + b.value, 0) : 0;
    const balance = totalIncome - totalExpenses - totalSavings - totalMinimumPayments;

    return (
        <Box>
            <Topbar title="Budget App" />
            <Tile variant="secondary" sx={{ display: "flex", flexDirection: "row", maxWidth:"75vw", margin: "20px auto 20px auto" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        margin: "20px auto 20px auto",
                        gap: "20px",
                        '& > *': {
                            textAlign: "center",
                            margin: "auto",
                        } 
                    }}
                >
                    <Typography variant="h3">Income: {formatToDollar(totalIncome)}</Typography>
                    <Typography variant="h3">Expenses: {formatToDollar(totalExpenses)}</Typography>
                    <Typography variant="h3">Savings: {formatToDollar(totalSavings)}</Typography>
                    <Typography variant="h3">Debt: {formatToDollar(totalMinimumPayments)}</Typography>
                    <Typography variant="h3" color={ balance < 0 ? colors.redAccent[500] : colors.greenAccent[500]}>Balance: {formatToDollar(balance)}</Typography>
                </Box>
            </Tile>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                }}
            >
                {budgetTiles}
                <AddTileButton addTile={handleAddTile} />
            </Box>
        </Box>
    );
};

export default BudgetApp;