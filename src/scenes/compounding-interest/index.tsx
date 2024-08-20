import { useState } from 'react';
import CompoundInterestTable from './CompoundInterestTable';
import CompoundInterestForm from './CompoundInterestForm';
import CompoundInterestChart from './CompoundInterestChart';
import { Box, Tabs } from '@mui/material';
import { CustomTabPanel, StyledTab, a11yProps } from '../../components/Tabs';
import Topbar from '../global/Topbar';
import Helpers from '../../libraries/Helpers';
import Tile from '../../components/Tile';
import Counter from '../../components/Counter';
const formatToDollar = Helpers.String.FormatToDollar.format;

export type Stats = {
    total: number,
    totalGrowth: number,
    totalContribution: number
};

export type RowProps = {
    id: number;
    potentialValue: number;
    monthlyGrowth: number;
    totalGrowth: number;
    totalMonthlyContributions: number;
};

const calculateInterest = (interestRatePercent:number, principal:number) => {
    // Calculation logic goes here    
    const interestRate = interestRatePercent / 100;
    const monthlyInterestRate = interestRate / 12;

    return principal * monthlyInterestRate;
};

const generateTable = (interestRatePercent:number, monthlyPayment:number, timePeriod:number, stats:Stats, breakdownByMonth:boolean): [RowProps[], Stats] => {
    const arr:RowProps[] = [{id: 0, potentialValue: stats.total, monthlyGrowth: 0, totalGrowth: 0, totalMonthlyContributions: 0}];
    let month = 1;

    while (month <= timePeriod) {
        let monthInterest = calculateInterest(interestRatePercent, stats.total);
        let yearlyInterest = 0;
        
        stats.totalGrowth += monthInterest;
        yearlyInterest += monthInterest;
        stats.total += monthInterest + monthlyPayment;
        stats.totalContribution += monthlyPayment;
        
        if (breakdownByMonth || month % 12 === 0 ) {
            arr.push(
                {
                    id: (breakdownByMonth ? month : month / 12), 
                    potentialValue: stats.total,
                    monthlyGrowth: breakdownByMonth ? monthInterest : yearlyInterest,
                    totalGrowth: stats.totalGrowth,
                    totalMonthlyContributions: stats.totalContribution,
                }
            );
            yearlyInterest = 0;
        }
        month++;
    }
    return [arr, stats]; 
};

const CompoundingInterestApp: React.FC = () => {    
    const [principal, setPrincipal] = useState<number>(100_000);
    const [interestRatePercent, setInterestRate] = useState<number>(5);
    const [timePeriod, setTimePeriod] = useState<number>(360);
    const [monthlyPayment, setMonthlyPayment] = useState<number>(500);
    const [breakdownByMonth, setBreakdownByMonth] = useState<boolean>(false);
    const [table, stats] = generateTable(interestRatePercent, monthlyPayment, timePeriod, {total: principal, totalGrowth: 0, totalContribution: 0}, breakdownByMonth);
    
    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box>
            <Topbar title="Compounding Interest Calculator" />
            <Box
                display="flex"
                flexWrap={"wrap"}
            >
                <CompoundInterestForm 
                    updatePrincipalAmount={setPrincipal}
                    updateInterestRate={setInterestRate}
                    updateTermLength={setTimePeriod}
                    updateMonthlyPayment={setMonthlyPayment}
                    updateBreakDownByMonth={setBreakdownByMonth}
                />
                <Box gap="5px"> 
                    <Tile>
                        <Box display='flex' flexDirection='row' justifyContent='space-between'>
                            <Counter label={`Total:`} amount={formatToDollar(stats.total)}/>
                            <Counter label={`Total contribution:`} amount={formatToDollar(stats.totalContribution)} />
                            <Counter label={`Total growth:`} amount={formatToDollar(stats.totalGrowth)} />
                        </Box>
                    </Tile>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="amortization table tabs">
                        <StyledTab disableRipple label="Chart" {...a11yProps(0)} />
                        <StyledTab disableRipple label="Table" {...a11yProps(1)} />
                    </Tabs>
                    <CustomTabPanel index={0} value={tabValue} >
                        <Tile variant="primary" sx={{ margin: "none"}}>
                            <CompoundInterestChart 
                                table={table}
                                breakdownByMonth={breakdownByMonth}
                                startingValue={principal}
                                key="3"
                            />
                        </Tile>
                    </CustomTabPanel>
                    <CustomTabPanel index={1} value={tabValue} >
                        <CompoundInterestTable
                            table={table}
                            breakdownByMonth={breakdownByMonth}
                        />
                    </CustomTabPanel>
                    
                </Box>
            </Box>
        </Box>
    );
};

export default CompoundingInterestApp;
