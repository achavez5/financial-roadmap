import { useState, useEffect } from 'react';
import { Box, useTheme, Typography, ButtonBase } from '@mui/material';
import Helpers from '../../libraries/Helpers';
import Topbar from '../global/Topbar';
import { colorTokens } from '../../theme';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from 'react';
const formatToDollar = Helpers.String.FormatToDollar.format;

type BudgetItem = {
    category: string,
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
    }
];
const transformKey = (word: string) => {
    return Helpers.String.CapitalizeFirstCharacterOfWord(word).replace(/_/g, " "); 
} 

type TileProps = {
    children: React.ReactNode[] | React.ReactNode,
    sx?: any,
    variant?: "primary" | "secondary",
    addTile?: () => void,
}

const Tile = (props: TileProps) => {
    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const boxShadow = theme.palette.mode === "dark" ? "0px 0px 10px 0px rgba(0,0,0,0.75)" : "0px 0px 10px 0px rgba(0,0,0,0.25)";
    const borderRadius = "4px";
    const mode = theme.palette.mode;
    let backgroundColor = "";

    if (props.variant === "primary") {
        backgroundColor = mode === "dark" ? colors.primary[400] : colors.primary[900];
    } else {
        backgroundColor = mode === "dark" ? colors.primary[700] : colors.primary[800];
    }
    
    return (
        <Box
            onClick={props.addTile}
            sx={{
                backgroundColor: backgroundColor,
                margin: "0 20px 20px 20px",
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
const BudgetTile = (budgetItem:BudgetItem, key:number) => {
    return ( 
        <Tile variant="primary" key={key} sx={{width:"15rem", height:"15rem"}}>
            <Typography variant="h4" sx={{marginBottom: "20px"}}>{transformKey(budgetItem.category)}</Typography>
            <Box>
                {Object.entries(budgetItem?.items || []).map(([_key, value]) => (
                    <Typography marginBottom=".25rem" marginLeft="1rem" marginRight="1rem" key={_key}>{transformKey(_key)}: {formatToDollar(value)}</Typography>
                ))}
            </Box>
        </Tile>
    );
};    

const BudgetApp = () => {
    
    const [ tiles, updateTiles ] = useState([] as React.ReactNode[]);
    const theme = useTheme(); 
    const colors = colorTokens(theme.palette.mode);

    const handleAddTile = () => {
        console.log("Add tile");
    }

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

    for (let i = 0; i < budget.length; i++) {
       tiles.push(<BudgetTile {...budget[i]} key={i} />);
    }
    
    useEffect(() => updateTiles(tiles), [tiles]);

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
                        margin: "20px auto 40px auto",
                    }}
                >
                    <Typography variant="h4">Income: {formatToDollar(totalIncome)}</Typography>
                    <Typography variant="h4">Expenses: {formatToDollar(totalExpenses)}</Typography>
                    <Typography variant="h4">Savings: {formatToDollar(totalSavings)}</Typography>
                    <Typography variant="h4">Debt: {formatToDollar(totalMinimumPayments)}</Typography>
                    <Typography variant="h4" color={ balance < 0 ? colors.redAccent[500] : colors.greenAccent[500]}>Balance: {formatToDollar(balance)}</Typography>
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