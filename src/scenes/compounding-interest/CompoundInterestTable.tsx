import { Helpers } from "../../libraries/Helpers";
import CalculatorTable from "../../components/CalculatorTable";
import { GridColDef } from "@mui/x-data-grid";
const formatToDollar = Helpers.String.FormatToDollar.format;

type CompoundInterestTableProps = {
    principal: number;
    interestRatePercent: number;
    monthlyPayment: number;
    timePeriod: number;
    breakdownByMonth: boolean;
};

type Stats = {
    total: number,
    totalGrowth: number,
    totalContribution: number
};

type RowProps = {
    id: number;
    potentialValue: string;
    monthlyGrowth: string;
    totalGrowth: string;
};

const calculateInterest = (interestRatePercent:number, principal:number) => {
    // Calculation logic goes here    
    const interestRate = interestRatePercent / 100;
    const monthlyInterestRate = interestRate / 12;

    return principal * monthlyInterestRate;
};

const generateTable = (interestRatePercent:number, monthlyPayment:number, timePeriod:number, stats:Stats, breakdownByMonth:boolean) => {
    const arr:RowProps[] = [];
    const timePeriodInMonths = timePeriod * 12;
    let month = 1;

    while (month <= timePeriodInMonths) {
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
                    potentialValue: formatToDollar(stats.total),
                    monthlyGrowth: formatToDollar(breakdownByMonth ? monthInterest : yearlyInterest),
                    totalGrowth: formatToDollar(stats.totalGrowth)
                }
            );
            yearlyInterest = 0;
        }
        month++;
    }
    return (arr); 
};

const CompoundInterestTable = ({ principal, interestRatePercent, monthlyPayment, timePeriod, breakdownByMonth }: CompoundInterestTableProps) => {
    const stats:Stats = {
        total: principal,
        totalGrowth: 0,
        totalContribution: principal   
    };
    const table = generateTable(interestRatePercent, monthlyPayment, timePeriod, stats, breakdownByMonth);
    const columns: GridColDef[] = [
        { field: 'id', headerName: (breakdownByMonth ? 'Month' : 'Year'), flex: 0.5},
        { field: 'potentialValue', headerName: 'Potential Value', sortable: false, flex: 1},
        { field: 'monthlyGrowth', headerName: 'Monthly Growth', sortable: false, flex: 1},
        { field: 'totalGrowth', headerName: 'Total Growth', sortable: false, flex: 1},
    ];
    
    return (
        <CalculatorTable
            columns={columns}
            table={table}
        />
    );
};

export default CompoundInterestTable;