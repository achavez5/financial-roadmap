import { useState } from 'react';
import { Helpers } from '../../Libraries/Helpers';

const calculateInterest = (interestRatePercent:number, principal:number) => {
    // Calculation logic goes here    
    let interestRate = interestRatePercent / 100;
    let monthlyInterestRate = interestRate / 12;

    return principal * monthlyInterestRate;
};

const CompoundingInterestApp: React.FC = () => {    
    const [principal, setPrincipal] = useState<number>(1000);
    const [interestRatePercent, setInterestRate] = useState<number>(8);
    const [timePeriod, setTimePeriod] = useState<number>(30);
    // const [compoundFrequency, setCompoundFrequency] = useState<number>(1);
    const [monthlyPayment, setMonthlyPayment] = useState<number>(200);
    const formatToDollar = Helpers.String.FormatToDollar.format;


    // TODO: break out logic like amort table
    let totalInterest = 0; 
    let total = principal;
    let timePeriodInMonths = timePeriod * 12;
    let totalContribution = principal; 

    for (let i = 0; i < timePeriodInMonths; i++) {
        let monthInterest = calculateInterest(interestRatePercent, total);
        totalInterest += monthInterest; 
        total += monthInterest + monthlyPayment;
        totalContribution += monthlyPayment;
    }

    return (
        <div>
            <p>Initial amount: {formatToDollar(principal)} Total contributed: {formatToDollar(totalContribution)} <br></br>Total interest: {formatToDollar(totalInterest)} Final amount: {formatToDollar(total)}</p>
        </div>
    );
};

export default CompoundingInterestApp;
