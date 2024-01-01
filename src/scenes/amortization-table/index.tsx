import { useState } from "react";
import AmortizationForm from "./AmortizationForm";
import AmortizationTable from "./AmortizationTable";
import Topbar from "../global/Topbar"; 
import { Box } from "@mui/material";

const AmortizationApp = () => {
    // Default values
    const [loanAmount, updateLoanAmount] = useState(100_000);
    const [termLength, updateTermLength] = useState(360);
    const [interestRate, updateInterestRate] = useState(5);
    const [breakdownByMonth, updateBreakDownByMonth] = useState(false);
    const [extraPrincipalPayment, updateExtraPrincipalPayment] = useState(0);
    const [extraYearlyPayment, updateExtraYearlyPayment] = useState(0);

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
    )
    ]; 

    return (
        <Box>
           <Topbar title="Amortization table" /> 
            <Box
                display="flex"
                flexWrap="wrap"
                maxHeight="100vh"
            >
                {appParts}
            </Box>
        </Box>
    );
};

export default AmortizationApp;