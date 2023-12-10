import { useState } from "react";
import AmortizationForm from "./AmortizationForm";
import AmortizationTable from "./AmortizationTable";
import { HStack, Box } from "@chakra-ui/react";

const AmortizationApp = () => {
    // Default values
    const [loanAmount, updateLoanAmount] = useState(100_000);
    const [termLength, updateTermLength] = useState(30);
    const [interestRate, updateInterestRate] = useState(5);
    const [breakdownByMonth, updateBreakDownByMonth] = useState(false);

    return (
        <>
            <HStack spacing={4} align="top">
                <Box boxSize="md">
                    <AmortizationForm 
                        updateLoanAmount={updateLoanAmount} 
                        updateTermLength={updateTermLength}
                        updateInterestRate={updateInterestRate}
                        updateBreakDownByMonth={updateBreakDownByMonth}
                        breakdownByMonth={breakdownByMonth}
                    />
                </Box>
                <AmortizationTable 
                        loanAmount={loanAmount}
                        termLength={termLength}
                        interestRate={interestRate}
                        breakdownByMonth={breakdownByMonth}
                />
            </HStack>
        </>
    )
};

export default AmortizationApp;