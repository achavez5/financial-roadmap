import { useState } from "react";
import AmortizationForm from "./AmortizationForm";
import AmortizationTable from "./AmortizationTable";
import AmortizationChart from "./AmortizationChart";
import Tile from "../../components/Tile";
import Topbar from "../global/Topbar"; 
import { Box, Tab, Tabs, styled, Typography } from "@mui/material";
import { colorTokens } from "../../theme";
import Helpers from "../../libraries/Helpers"; 

type Stats = {
    total: number,
    totalInterest: number
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
export type RowProps = {
    id: number,
    interestRate: number,
    principalPayment: number,
    balance: number,
};

function generateTable(loanAmount:number, interestRate:number, extraPrincipalPayment:number, extraYearlyPayment:number, stats:Stats, paymentAmount:number, breakdownByMonth:boolean): [RowProps[], Stats] {
    let yearlyPrincipal = 0, yearlyInterest = 0;
    let arr: RowProps[] = [];
    let balance = loanAmount;
    let month = 1;
    
    while (balance > 0) {
        let interest = balance * (interestRate / 12) / 100;
        let principal = paymentAmount - interest;
        
        if (extraYearlyPayment > 0 && month % 12 === 0) {
            principal += extraYearlyPayment;
        }
        
        // handle last payment
        if (balance - principal < 0) {
            principal = balance;
        }
        
        stats.total += principal + interest;
        stats.totalInterest += interest;
        balance -= principal;
        
        if(!breakdownByMonth) {
            if (month % 12 === 1) {
                yearlyPrincipal = 0;
                yearlyInterest = 0;
            }
            yearlyInterest += interest;
            yearlyPrincipal += principal;
        }
        
        if (breakdownByMonth || month % 12 === 0) {
            arr.push(
                {
                    id: (breakdownByMonth ? month : month / 12),
                    interestRate: (breakdownByMonth ? interest : yearlyInterest),
                    principalPayment: (breakdownByMonth ? principal : yearlyPrincipal),
                    balance: balance,
                }
            );
        }
        month++;
    }
    
    if ((extraPrincipalPayment > 0 || extraYearlyPayment > 0) && !breakdownByMonth) {
        arr.push(
            {
                id: Math.ceil(month / 12),
                interestRate: yearlyInterest,
                principalPayment: yearlyPrincipal,
                balance: balance,
            }
        );
    }
    return [arr, stats];
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && children}
      </div>
    );
}

const StyledTab = styled(Tab)(({ theme }) => {
    const colors = colorTokens(theme.palette.mode);
    return (
        {
            color: colors.grey[100],
            "&.Mui-selected": {
                color: colors.grey[400],
            },
            "&.MuiTab-root": {
                minWidth: "50%",
            }
        }
    )
});

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AmortizationApp = () => {
    const formatToDollar = Helpers.String.FormatToDollar.format;

    // Default values
    const [loanAmount, updateLoanAmount] = useState(100_000);
    const [termLength, updateTermLength] = useState(360);
    const [interestRate, updateInterestRate] = useState(5);
    const [breakdownByMonth, updateBreakDownByMonth] = useState(false);
    const [extraPrincipalPayment, updateExtraPrincipalPayment] = useState(0);
    const [extraYearlyPayment, updateExtraYearlyPayment] = useState(0);
    const [tabValue, setTabValue] = useState(0);
    const paymentAmount = Helpers.Math.GetPaymentAmount(loanAmount, interestRate, termLength) + (extraPrincipalPayment || 0);
    const [table, stats] = generateTable(loanAmount, interestRate, extraPrincipalPayment, extraYearlyPayment, { total: 0, totalInterest: 0 }, paymentAmount, breakdownByMonth);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box>
            <Topbar title="Amortization table" /> 
            <Box display="flex">
                <Box>
                    <AmortizationForm 
                        updateLoanAmount={updateLoanAmount} 
                        updateTermLength={updateTermLength}
                        updateInterestRate={updateInterestRate}
                        updateBreakDownByMonth={updateBreakDownByMonth}
                        updateExtraMonthlyPayment={updateExtraPrincipalPayment}
                        updateExtraYearlyPayment={updateExtraYearlyPayment}
                        key="1"
                    />
                </Box>
                <Box>
                    <Tile>
                        <Box display='flex' flexDirection='row' justifyContent='space-evenly'>
                            <Typography>{`Payment:\n${formatToDollar(paymentAmount)}`}</Typography>
                            <Typography>{`Total:\n${formatToDollar(stats.total)}`}</Typography>
                            <Typography>{`Total interest:\n${formatToDollar(stats.totalInterest)}`}</Typography>
                        </Box>
                    </Tile>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="amortization table tabs">
                        <StyledTab disableRipple label="Chart" {...a11yProps(0)} />
                        <StyledTab disableRipple label="Table" {...a11yProps(1)} />
                    </Tabs>
                    <CustomTabPanel index={0} value={tabValue} >
                        <Tile variant="primary" sx={{ margin: "none"}}>
                            <AmortizationChart 
                                table={table}
                                breakdownByMonth={breakdownByMonth}
                                key="3"
                            />
                        </Tile>
                    </CustomTabPanel>
                    <CustomTabPanel index={1} value={tabValue} >
                        <AmortizationTable 
                            table={table}
                            breakdownByMonth={breakdownByMonth}
                            key="2"
                        />
                    </CustomTabPanel>
                </Box>
            </Box>
        </Box>
    );
};

export default AmortizationApp;