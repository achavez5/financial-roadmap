import { useState, useEffect } from "react";
import AmortizationForm from "./AmortizationForm";

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
            <AmortizationForm 
                updateLoanAmount={updateLoanAmount} 
                updateTermLength={updateTermLength}
                updateInterestRate={updateInterestRate}
                />
        </>
    )
};

export default AmortizationApp;