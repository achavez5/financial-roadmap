import { useState } from "react";
import AmortizationForm from "./AmortizationForm";
import AmortizationTable from "./AmortizationTable";
import { VStack } from "@chakra-ui/layout";

const AmortizationApp = () => {
    // Default values
    const [loanAmount, updateLoanAmount] = useState(100_000);
    const [termLength, updateTermLength] = useState(360);
    const [interestRate, updateInterestRate] = useState(5);

    return (
        <>
            <VStack>
                <AmortizationForm 
                    updateLoanAmount={updateLoanAmount} 
                    updateTermLength={updateTermLength}
                    updateInterestRate={updateInterestRate}
                />
                <AmortizationTable 
                    loanAmount={loanAmount}
                    termLength={termLength}
                    interestRate={interestRate}
                />
            </VStack>
        </>
    )
};

export default AmortizationApp;