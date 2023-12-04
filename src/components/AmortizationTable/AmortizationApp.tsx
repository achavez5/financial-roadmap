import { useState, useEffect } from "react";
import AmortizationForm from "./AmortizationForm";
import AmortizationTable from "./AmortizationTable";
import { VStack } from "@chakra-ui/layout";

const AmortizationApp = () => {
    const [loanAmount, updateLoanAmount] = useState(100_000);
    const [termLength, updateTermLength] = useState(360);
    const [interestRate, updateInterestRate] = useState(5);

    // TODO: remove this useEffect when amort table is complete
    // console to reduce warning noise
    useEffect(function () {
        console.log(loanAmount, termLength, interestRate);
    }, [loanAmount, termLength, interestRate]);

    return (
        <>
            <VStack>
                <AmortizationForm 
                    updateLoanAmount={updateLoanAmount} 
                    updateTermLength={updateTermLength}
                    updateInterestRate={updateInterestRate}
                />
                <AmortizationTable />
            </VStack>
        </>
    )
};

export default AmortizationApp;