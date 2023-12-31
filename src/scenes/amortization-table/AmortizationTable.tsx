import { GridColDef } from "@mui/x-data-grid";
import { Helpers } from "../../libraries/Helpers";
import { AppVariant } from ".";
import CalculatorTable from "../../components/CalculatorTable";

type AmortizationTableProps = {
    loanAmount: number,
    termLength: number,
    interestRate: number,
    breakdownByMonth: boolean,
    extraPrincipalPayment: number,
    extraYearlyPayment: number,
    variants?: AppVariant,
    accordionToggled?: boolean,
}

type Stats = {
    total: number,
    totalInterest: number
};

type RowProps = {
    id: number,
    interestRate: number,
    principalPayment: number,
    balance: number,
};

function generateTable(loanAmount:number, interestRate:number, extraPrincipalPayment:number, extraYearlyPayment:number, stats:Stats, paymentAmount:number, breakdownByMonth:boolean, variants:AppVariant = { oneColumnApp: true, compactApplication: true }): RowProps[] {
    let yearlyPrincipal = 0, yearlyInterest = 0;
    let arr: RowProps[] = [];
    let balance = loanAmount;
    let month = 1;
    
    while (balance > 0) {
        let interest = balance * (interestRate / 12) / 100;
        let principal = paymentAmount - interest;
        
        if (extraYearlyPayment > 0 && month % 12 === 0) {
            principal += extraYearlyPayment;
        }
        
        // handle last payment
        if (balance - principal < 0) {
            principal = balance;
        }
        
        stats.total += principal + interest;
        stats.totalInterest += interest;
        balance -= principal;
        
        if(!breakdownByMonth) {
            if (month % 12 === 1) {
                yearlyPrincipal = 0;
                yearlyInterest = 0;
            }
            yearlyInterest += interest;
            yearlyPrincipal += principal;
        }
        
        if (breakdownByMonth || month % 12 === 0) {
            arr.push(
                {
                    id: (breakdownByMonth ? month : month / 12),
                    interestRate: (breakdownByMonth ? interest : yearlyInterest),
                    principalPayment: (breakdownByMonth ? principal : yearlyPrincipal),
                    balance: balance,
                }
            );
        }
        month++;
    }
    
    if ((extraPrincipalPayment > 0 || extraYearlyPayment > 0) && !breakdownByMonth) {
        arr.push(
            {
                id: Math.ceil(month / 12),
                interestRate: yearlyInterest,
                principalPayment: yearlyPrincipal,
                balance: balance,
            }
        );
    }
    
    return arr;
}

const AmortizationTable = ({ loanAmount, termLength, interestRate, breakdownByMonth, extraPrincipalPayment, extraYearlyPayment, variants }: AmortizationTableProps) => {
    const paymentAmount = Helpers.Math.GetPaymentAmount(loanAmount, interestRate, termLength) + (extraPrincipalPayment || 0);
    const stats:Stats = { total: 0, totalInterest: 0 };
    const table = generateTable(loanAmount, interestRate, extraPrincipalPayment, extraYearlyPayment, stats, paymentAmount, breakdownByMonth, variants);
    const valueFormatter = (params:any) => Helpers.String.FormatToDollar.format(params.value);

    // store the header to have on top and bottom of table
    const columns: GridColDef[] = [
        { field: 'id', headerName: ( breakdownByMonth ? "Month" : "Year" ), flex: 0.5 },
        { field: 'interestRate', headerName: 'Interest rate', sortable: false, valueFormatter: valueFormatter, flex: 1 },
        { field: 'principalPayment', headerName: 'Principal payment', sortable: false, valueFormatter: valueFormatter, flex: 1 },
        { field: 'balance', headerName: 'Balance', sortable: false, valueFormatter: valueFormatter, flex: 1 },
    ];
    
    return (
        <CalculatorTable columns={columns} table={table} />
    );
};

export default AmortizationTable;