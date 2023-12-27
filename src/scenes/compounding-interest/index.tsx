import { useState } from 'react';
import CompoundInterestTable from './CompoundInterestTable';
import CompoundingInterestForm from './CompoundingInterestForm';
import { Box } from '@mui/material';
import Topbar from '../global/Topbar';

const CompoundingInterestApp: React.FC = () => {    
    const [principal, setPrincipal] = useState<number>(100_000);
    const [interestRatePercent, setInterestRate] = useState<number>(5);
    const [timePeriod, setTimePeriod] = useState<number>(30);
    const [monthlyPayment, setMonthlyPayment] = useState<number>(500);

    return (
        <Box>
            <Topbar title="Compounding Interest Calculator" />
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
        </Box>
    );
};

export default CompoundingInterestApp;
