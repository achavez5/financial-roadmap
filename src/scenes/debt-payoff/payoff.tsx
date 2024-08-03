import { Loan, Stats } from './types';
import { Round } from '../../libraries/Math_Helpers';

export function avalanchePayoff(loans: Loan[], stats: Stats, extraPayment: number ): void 
{
    loans.sort( (a, b) => b.interestRate - a.interestRate);
    calculatePayoff(loans, stats, extraPayment);
};

export function snowballPayoff(loans: Loan[], stats: Stats, extraPayment: number): void
{
    loans.sort( (a, b) => a.balance - b.balance);
    calculatePayoff(loans, stats, extraPayment);
}

export function calculatePayoff(loans: Loan[], stats: Stats, extraPayment: number ): void 
{
    let interest = 0, principalPayment = 0, remainderAfterPayoff = 0;
    let print = "", header = "";

    while (stats.totalBalance > 0) {
        let i = 0;
        let first = true;
        while (i < loans.length && loans.length > 0) {
            let loan = loans[i];
            if (stats.month === 1) {
                header += loan.name + (loans.length - 1 === i ? "\n" : ",");
            }
            print += Round(loan.balance) + (loans.length - 1 === i ? "\n" : ",");

            if (loan.balance <= 0) {
                i++;
                continue;
            }

            interest = loan.balance * (loan.interestRate / 100) / 12;
            principalPayment = (loan.minimumPayment || 0 ) - interest;
            
            // rollover from extra left over after paying off the last loan
            if (remainderAfterPayoff > 0) {
                principalPayment += remainderAfterPayoff;
                remainderAfterPayoff = 0;
            }
            
            // adding extra payment to first loan
            if (first === true) {
                principalPayment += extraPayment;
                first = false;
            }
           
            // payoff condition 
            if (loan.balance < principalPayment) {
                remainderAfterPayoff = Math.ceil((principalPayment - loan.balance) * 100) / 100;
                principalPayment = loan.balance;
            }

            // capture stats
            loan.balance -= principalPayment;
            stats.totalBalance -= principalPayment;
            stats.totalPayment += principalPayment + interest;
            stats.totalInterest += interest;
        
            if (loan.balance <= 0) {
                stats.payoffOrder.push(loans[i].name as string);
                extraPayment += loan.minimumPayment || 0;
                console.log("Loan paid off: " + loan.name + " on month " + stats.month);
                console.log("Extra payments moving forward after paying off loan: " + extraPayment);
                if (Round(stats.totalBalance) <= 0) {
                    let date = new Date();
                    date.setMonth(date.getMonth() + stats.month);
                    console.log(`Payoff: ${date}`);
                    console.log("Csvoutput\n" + header + print);
                    return;
                }
            }
            i++;
        }
        if (stats.totalBalance > 0) {
            stats.month++;
        }

        if (stats.month > 480) {
            stats.payoffOrder = ["Calculation stopped. The loans entered will take more than 40 years to payoff. Check you minimum payments, interest rates, and extra payment amount."];
            console.error("Breaking out of loop in payoffOrder. The loans will take too long to payoff."); 
            break; 
        }
    }
};