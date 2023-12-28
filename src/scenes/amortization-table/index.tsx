import { useState } from "react";
import AmortizationForm from "./AmortizationForm";
import AmortizationTable from "./AmortizationTable";
import { Stack} from "@chakra-ui/react";
import Topbar from "../global/Topbar"; 

export type AppVariant = {
    oneColumnApp: boolean,
    compactApplication: boolean,
}

const AmortizationApp = () => {
    // Default values
    const [loanAmount, updateLoanAmount] = useState(100_000);
    const [termLength, updateTermLength] = useState(30);
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
            breakdownByMonth={breakdownByMonth}
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
        <>
           <Topbar title="Amortization table" /> 
            <><Stack align="center" fontSize={ "md"} id="amortization-app-stack">
                {appParts}
            </Stack></>
        </>
    );
};

export default AmortizationApp;