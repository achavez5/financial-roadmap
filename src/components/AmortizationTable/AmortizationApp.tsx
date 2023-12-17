import { useState, useEffect } from "react";
import AmortizationForm from "./AmortizationForm";
import AmortizationTable from "./AmortizationTable";
import { HStack, VStack, Box, useBreakpointValue } from "@chakra-ui/react";

const smVariant = { oneColumnApp: true };
const mdVariant = { oneColumnApp: true };
const lgVariant = { oneColumnApp: false };

const AmortizationApp = () => {
    // Default values
    const [loanAmount, updateLoanAmount] = useState(100_000);
    const [termLength, updateTermLength] = useState(30);
    const [interestRate, updateInterestRate] = useState(5);
    const [breakdownByMonth, updateBreakDownByMonth] = useState(false);
    const [extraPrincipalPayment, updateExtraPrincipalPayment] = useState(0);
    const [extraYearlyPayment, updateExtraYearlyPayment] = useState(0);

    const variants = useBreakpointValue({ base: smVariant, md: mdVariant, lg: lgVariant })
    const appParts = [
    (
        <Box boxSize="md">
            <AmortizationForm 
                updateLoanAmount={updateLoanAmount} 
                updateTermLength={updateTermLength}
                updateInterestRate={updateInterestRate}
                updateBreakDownByMonth={updateBreakDownByMonth}
                updateExtraPrincipalPayment={updateExtraPrincipalPayment}
                updateExtraYearlyPayment={updateExtraYearlyPayment}
                breakdownByMonth={breakdownByMonth}
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
        />
    )
    ]; 

    useEffect(() => {
        console.log("variants", variants, "oneAppColumn", variants?.oneColumnApp);
    }, [variants]);

    return variants?.oneColumnApp 
    ? (
        <><VStack spacing={4} align="center">
            {appParts}
        </VStack></>
    ) 
    : (
        <><HStack spacing={4} align="top">
            {appParts}
        </HStack></>
    );
};

export default AmortizationApp;