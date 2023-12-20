import { useState } from 'react';
import CompoundInterestTable from './CompoundInterestTable';



const CompoundingInterestApp: React.FC = () => {    
    const [principal, setPrincipal] = useState<number>(1000);
    const [interestRatePercent, setInterestRate] = useState<number>(8);
    const [timePeriod, setTimePeriod] = useState<number>(30);
    const [monthlyPayment, setMonthlyPayment] = useState<number>(200);

    return (
        <div>
            <CompoundInterestTable
                interestRatePercent={interestRatePercent} 
                principal={principal} 
                monthlyPayment={monthlyPayment}
                timePeriod={timePeriod}
            />
        </div>
    );
};

export default CompoundingInterestApp;
