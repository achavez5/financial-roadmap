import { useState } from 'react';
import CompoundInterestTable from './CompoundInterestTable';
import CompoundingInterestForm from './CompoundingInterestForm';
import { Stack } from '@chakra-ui/react';

const CompoundingInterestApp: React.FC = () => {    
    const [principal, setPrincipal] = useState<number>(100_000);
    const [interestRatePercent, setInterestRate] = useState<number>(5);
    const [timePeriod, setTimePeriod] = useState<number>(30);
    const [monthlyPayment, setMonthlyPayment] = useState<number>(500);

    return (
        <div>
        <><Stack align={"top"} id="amortization-app-hstack" direction={"row"}>
            <CompoundingInterestForm 
                updatePrincipalAmount={setPrincipal}
                updateInterestRate={setInterestRate}
                updateTermLength={setTimePeriod}
                updateMonthlyPayment={setMonthlyPayment}
            />
            <CompoundInterestTable
                interestRatePercent={interestRatePercent} 
                principal={principal} 
                monthlyPayment={monthlyPayment}
                timePeriod={timePeriod}
            />
        </Stack></>
            
        </div>
    );
};

export default CompoundingInterestApp;
