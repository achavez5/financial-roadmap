import React from "react";
import { Helpers } from "../../libraries/Helpers";
import { colorTokens } from "../../theme";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, useTheme } from "@mui/material";
const formatToDollar = Helpers.String.FormatToDollar.format;

type CompoundInterestTableProps = {
    principal: number;
    interestRatePercent: number;
    monthlyPayment: number;
    timePeriod: number;
};

type Stats = {
    total: number,
    totalGrowth: number,
    totalContribution: number
};

type RowProps = {
    id: number;
    potentialValue: string;
    monthlyGrowth: string;
    totalGrowth: string;
};

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Month', flex: 0.5},
    { field: 'potentialValue', headerName: 'Potential Value', sortable: false, flex: 1},
    { field: 'monthlyGrowth', headerName: 'Monthly Growth', sortable: false, flex: 1},
    { field: 'totalGrowth', headerName: 'Total Growth', sortable: false, flex: 1},
];

const calculateInterest = (interestRatePercent:number, principal:number) => {
    // Calculation logic goes here    
    const interestRate = interestRatePercent / 100;
    const monthlyInterestRate = interestRate / 12;

    return principal * monthlyInterestRate;
};

const generateTable = (interestRatePercent:number, monthlyPayment:number, timePeriod:number, stats:Stats) => {
    
    const arr:RowProps[] = [];
    const timePeriodInMonths = timePeriod * 12;

    for (let i = 0; i < timePeriodInMonths; i++) {
        let monthInterest = calculateInterest(interestRatePercent, stats.total);
        stats.totalGrowth += monthInterest; 
        stats.total += monthInterest + monthlyPayment;
        stats.totalContribution += monthlyPayment;
        
        arr.push(
            {
                id: i + 1, 
                potentialValue: formatToDollar(stats.total),
                monthlyGrowth: formatToDollar(monthInterest),
                totalGrowth: formatToDollar(stats.totalGrowth)
            }
        );
    }
    return (arr); 
};

const CompoundInterestTable = ({ principal, interestRatePercent, monthlyPayment, timePeriod }: CompoundInterestTableProps) => {
    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const boxShadow = theme.palette.mode === "dark" ? "0px 0px 10px 0px rgba(0,0,0,0.75)" : "0px 0px 10px 0px rgba(0,0,0,0.25)";

    const stats:Stats = {
        total: principal,
        totalGrowth: 0,
        totalContribution: principal   
    };

    const table = generateTable(interestRatePercent, monthlyPayment, timePeriod, stats);

    const tableStats = [
        // TODO: stats
    ];

    return (
       <Box
            borderRadius="4px"
            id="compounding-box"
            boxShadow={boxShadow}
            maxWidth="100vw"
            minWidth="50vw"
            padding="20px"
            sx={{
                [theme.breakpoints.down("md")]: {
                    margin: "0 auto",
                },
                [theme.breakpoints.up("md")]: {
                    margin: "0 0 0 20px",
                },
            }}
        >
            <DataGrid
                rows={table}
                columns={columns}
                paginationMode="client"
                density="compact"
                isRowSelectable={() => false}
                rowSpacingType={'border'}
                pageSizeOptions={[10, 15, 20, 25]}
                disableColumnFilter
                disableColumnMenu
                disableColumnSelector
                disableEval
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 }},
                }}
                sx={{
                    display: "flex",
                    [`& .MuiDataGrid-columnHeader`]: {
                        backgroundColor: colors.blueAccent[500],
                    },
                }}
            />
       </Box> 
    );

};

export default CompoundInterestTable;