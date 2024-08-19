import { useState } from "react";
import AmortizationForm from "./AmortizationForm";
import AmortizationTable from "./AmortizationTable";
import AmortizationChart from "./AmortizationChart";
import Tile from "../../components/Tile";
import Topbar from "../global/Topbar"; 
import { Box, Tab, Tabs, styled } from "@mui/material";
import { colorTokens } from "../../theme";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
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
    // Default values
    const [loanAmount, updateLoanAmount] = useState(100_000);
    const [termLength, updateTermLength] = useState(360);
    const [interestRate, updateInterestRate] = useState(5);
    const [breakdownByMonth, updateBreakDownByMonth] = useState(false);
    const [extraPrincipalPayment, updateExtraPrincipalPayment] = useState(0);
    const [extraYearlyPayment, updateExtraYearlyPayment] = useState(0);
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const appParts = [
    (
        <AmortizationForm 
            updateLoanAmount={updateLoanAmount} 
            updateTermLength={updateTermLength}
            updateInterestRate={updateInterestRate}
            updateBreakDownByMonth={updateBreakDownByMonth}
            updateExtraMonthlyPayment={updateExtraPrincipalPayment}
            updateExtraYearlyPayment={updateExtraYearlyPayment}
            key="1"
        />
    ),
    (
        <AmortizationTable 
            loanAmount={loanAmount}
            termLength={termLength}
            interestRate={interestRate}
            breakdownByMonth={breakdownByMonth}
            extraPrincipalPayment={extraPrincipalPayment}
            extraYearlyPayment={extraYearlyPayment}
            key="2"
        />
    ),
    (
        <AmortizationChart 
            loanAmount={loanAmount}
            termLength={termLength}
            interestRate={interestRate}
            breakdownByMonth={breakdownByMonth}
            extraPrincipalPayment={extraPrincipalPayment}
            extraYearlyPayment={extraYearlyPayment}
            key="3"
        />
    )
    ]; 

    return (
        <Box>
            <Topbar title="Amortization table" /> 
            <Box display="flex">
                <Box sx={{ marginTop: "48px" }}>{appParts[0]}</Box>
                <Box> 
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="amortization table tabs">
                        <StyledTab disableRipple label="Chart" {...a11yProps(0)} />
                        <StyledTab disableRipple label="Table" {...a11yProps(1)} />
                    </Tabs>
                    <CustomTabPanel index={0} value={tabValue} >
                        <Tile variant="primary" sx={{ margin: "none"}}>{appParts[2]}</Tile>
                    </CustomTabPanel>
                    <CustomTabPanel index={1} value={tabValue} >
                        {appParts[1]}
                    </CustomTabPanel>
                </Box>
            </Box>
        </Box>
    );
};

export default AmortizationApp;