import { useState } from "react";
import AmortizationForm from "./AmortizationForm";
import AmortizationTable from "./AmortizationTable";
import { Fade, HStack, Box } from "@chakra-ui/react";

const AmortizationApp = () => {
    // Default values
    const [loanAmount, updateLoanAmount] = useState(0);
    const [termLength, updateTermLength] = useState(0);
    const [interestRate, updateInterestRate] = useState(0);
    const [breakdownByMonth, updateBreakDownByMonth] = useState(false);
    const [submitted, updateSubmitted] = useState(false);

    return (
        <>
            <HStack spacing={4} align="top">
                <Box boxSize="md">
                    <AmortizationForm 
                        updateLoanAmount={updateLoanAmount} 
                        updateTermLength={updateTermLength}
                        updateInterestRate={updateInterestRate}
                        updateBreakDownByMonth={updateBreakDownByMonth}
                        updateSubmitted={updateSubmitted}
                        breakdownByMonth={breakdownByMonth}
                    />
                </Box>
                <Fade in={Boolean(submitted && termLength && termLength && interestRate)}>
                    <AmortizationTable 
                            loanAmount={loanAmount}
                            termLength={termLength}
                            interestRate={interestRate}
                            breakdownByMonth={breakdownByMonth}
                    />
                </Fade>
            </HStack>
        </>
    )
};

export default AmortizationApp;