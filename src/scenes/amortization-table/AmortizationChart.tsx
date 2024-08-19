import DataLineChart from "../../components/DataLineChart";
import Helpers from "../../libraries/Helpers";

function generateTable(loanAmount: number, interestRate: number, breakdownByMonth: boolean, extraPrincipalPayment: number, extraYearlyPayment: number, paymentAmount: number) {
    let yearlyPrincipal = 0, yearlyInterest = 0;
    let arr = [];
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

export const AmortizationChart = ({ loanAmount, termLength, interestRate, breakdownByMonth, extraPrincipalPayment, extraYearlyPayment }: { loanAmount: number, termLength: number, interestRate: number, breakdownByMonth: boolean, extraPrincipalPayment: number, extraYearlyPayment: number }) => {
    const paymentAmount = Helpers.Math.GetPaymentAmount(loanAmount, interestRate, termLength) + (extraPrincipalPayment || 0);
    let table = generateTable(loanAmount, interestRate, breakdownByMonth, extraPrincipalPayment, extraYearlyPayment, paymentAmount);
    return (
        <DataLineChart data={table} xKeys={[{key: "id", label: breakdownByMonth ? "Month" : "Year"}]} yKeys={[{key:"interestRate", label: "Interest", stack: true}, {key: "principalPayment", label: "Principal", stack: true}, {key: "balance", label: "Balance", stack: false}]} />
    );
};

export default AmortizationChart;