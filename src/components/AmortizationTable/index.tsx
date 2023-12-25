import { useState } from "react";
import AmortizationForm from "./AmortizationForm";
import AmortizationTable from "./AmortizationTable";
import { Stack, useBreakpointValue } from "@chakra-ui/react";
// import Header from "../Header";

export type AppVariant = {
    oneColumnApp: boolean,
    compactApplication: boolean,
}

const smVariant:AppVariant = { oneColumnApp: true, compactApplication: true };
const mdVariant:AppVariant = { oneColumnApp: true, compactApplication: false };
const lgVariant:AppVariant = { oneColumnApp: true, compactApplication: false };
const xlVariant:AppVariant = { oneColumnApp: false, compactApplication: false};

const AmortizationApp = () => {
    // Default values
    const [loanAmount, updateLoanAmount] = useState(100_000);
    const [termLength, updateTermLength] = useState(30);
    const [interestRate, updateInterestRate] = useState(5);
    const [breakdownByMonth, updateBreakDownByMonth] = useState(false);
    const [extraPrincipalPayment, updateExtraPrincipalPayment] = useState(0);
    const [extraYearlyPayment, updateExtraYearlyPayment] = useState(0);
    const variants = useBreakpointValue({ base: smVariant, sm:smVariant, md: mdVariant, lg: lgVariant, xl: xlVariant });

    const appParts = [
    (
        <AmortizationForm 
            updateLoanAmount={updateLoanAmount} 
            updateTermLength={updateTermLength}
            updateInterestRate={updateInterestRate}
            updateBreakDownByMonth={updateBreakDownByMonth}
            updateExtraPrincipalPayment={updateExtraPrincipalPayment}
            updateExtraYearlyPayment={updateExtraYearlyPayment}
            breakdownByMonth={breakdownByMonth}
            variants={variants}
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
            variants={variants}
            key="2"
        />
    )
    ]; 

    return (
        <>
            {/* <Header onShowSidebar={toggleSidebar}/> */}
            {variants?.oneColumnApp 
            ? (
                <><Stack align="center" fontSize={variants?.compactApplication ? "sm" : "md"} id="amortization-app-stack">
                    {appParts}
                </Stack></>
            ) 
            : (
                <><Stack align={"top"} id="amortization-app-hstack" direction={"row"}>
                    {appParts}
                </Stack></>
            )}
        </>
    );
};

export default AmortizationApp;