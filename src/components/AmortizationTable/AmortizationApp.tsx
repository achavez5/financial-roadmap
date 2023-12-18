import { useState } from "react";
import AmortizationForm from "./AmortizationForm";
import AmortizationTable from "./AmortizationTable";
import { HStack, Stack, Box, useBreakpointValue } from "@chakra-ui/react";

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
        <Box boxSize={variants?.oneColumnApp ? "sm" : "md"} key="1" margin="0 auto">
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
        </Box>
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

    return variants?.oneColumnApp 
    ? (
        <><Stack spacing={variants?.compactApplication ? 125 : 175} align="center" fontSize={variants?.compactApplication ? "sm" : "md"}>
            {appParts}
        </Stack></>
    ) 
    : (
        <><HStack align={"top"}>
            {appParts}
        </HStack></>
    );
};

export default AmortizationApp;