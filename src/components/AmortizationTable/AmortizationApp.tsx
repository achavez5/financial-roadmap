import { useState } from "react";
import AmortizationForm from "./AmortizationForm";
import AmortizationTable from "./AmortizationTable";
import { VStack } from "@chakra-ui/react";

const AmortizationApp = () => {
    // Default values
    const [loanAmount, updateLoanAmount] = useState(0);
    const [termLength, updateTermLength] = useState(0);
    const [interestRate, updateInterestRate] = useState(0);
    const [breakdownByMonth, updateBreakDownByMonth] = useState(true);
    const [submitted, updateSubmitted] = useState(false);

    return (
        <>
            <VStack>
                <AmortizationForm 
                    updateLoanAmount={updateLoanAmount} 
                    updateTermLength={updateTermLength}
                    updateInterestRate={updateInterestRate}
                    updateBreakDownByMonth={updateBreakDownByMonth}
                    breakdownByMonth={breakdownByMonth}
                    updateSubmitted={updateSubmitted}
                />
                {
                    submitted && termLength && termLength && interestRate ? 
                        <AmortizationTable 
                            loanAmount={loanAmount}
                            termLength={termLength}
                            interestRate={interestRate}
                            breakdownByMonth={breakdownByMonth}
                        /> : null
                }
            </VStack>
        </>
    )
};

export default AmortizationApp;