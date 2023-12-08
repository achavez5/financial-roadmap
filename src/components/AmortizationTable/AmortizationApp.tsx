import { useState } from "react";
import AmortizationForm from "./AmortizationForm";
import AmortizationTable from "./AmortizationTable";
import { VStack } from "@chakra-ui/react";

const AmortizationApp = () => {
    // Default values
    const [loanAmount, updateLoanAmount] = useState(100_000);
    const [termLength, updateTermLength] = useState(360);
    const [interestRate, updateInterestRate] = useState(5);
    const [breakdownByMonth, updateBreakDownByMonth] = useState(true);

    return (
        <>
            <VStack>
                <AmortizationForm 
                    updateLoanAmount={updateLoanAmount} 
                    updateTermLength={updateTermLength}
                    updateInterestRate={updateInterestRate}
                    updateBreakDownByMonth={updateBreakDownByMonth}
                    breakdownByMonth={breakdownByMonth}
                />
                <AmortizationTable 
                    loanAmount={loanAmount}
                    termLength={termLength}
                    interestRate={interestRate}
                    breakdownByMonth={breakdownByMonth}
                />
            </VStack>
        </>
    )
};

export default AmortizationApp;