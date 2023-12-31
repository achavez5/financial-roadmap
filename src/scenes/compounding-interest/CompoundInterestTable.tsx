import { Helpers } from "../../libraries/Helpers";
import CalculatorTable from "../../components/CalculatorTable";
import { GridColDef } from "@mui/x-data-grid";
const formatToDollar = Helpers.String.FormatToDollar.format;

type CompoundInterestTableProps = {
    principal: number;
    interestRatePercent: number;
    monthlyPayment: number;
    timePeriod: number;
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

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Month', flex: 0.5},
    { field: 'potentialValue', headerName: 'Potential Value', sortable: false, flex: 1},
    { field: 'monthlyGrowth', headerName: 'Monthly Growth', sortable: false, flex: 1},
    { field: 'totalGrowth', headerName: 'Total Growth', sortable: false, flex: 1},
];

const calculateInterest = (interestRatePercent:number, principal:number) => {
    // Calculation logic goes here    
    const interestRate = interestRatePercent / 100;
    const monthlyInterestRate = interestRate / 12;

    return principal * monthlyInterestRate;
};

const generateTable = (interestRatePercent:number, monthlyPayment:number, timePeriod:number, stats:Stats) => {
    
    const arr:RowProps[] = [];
    const timePeriodInMonths = timePeriod * 12;

    for (let i = 0; i < timePeriodInMonths; i++) {
        let monthInterest = calculateInterest(interestRatePercent, stats.total);
        stats.totalGrowth += monthInterest; 
        stats.total += monthInterest + monthlyPayment;
        stats.totalContribution += monthlyPayment;
        
        arr.push(
            {
                id: i + 1, 
                potentialValue: formatToDollar(stats.total),
                monthlyGrowth: formatToDollar(monthInterest),
                totalGrowth: formatToDollar(stats.totalGrowth)
            }
        );
    }
    return (arr); 
};

const CompoundInterestTable = ({ principal, interestRatePercent, monthlyPayment, timePeriod }: CompoundInterestTableProps) => {

    const stats:Stats = {
        total: principal,
        totalGrowth: 0,
        totalContribution: principal   
    };

    const table = generateTable(interestRatePercent, monthlyPayment, timePeriod, stats);

    const tableStats = [
        // TODO: stats
    ];

    return (
        <CalculatorTable
            columns={columns}
            table={table}
        />
    );
};

export default CompoundInterestTable;