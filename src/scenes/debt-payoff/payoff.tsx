import { Loan, Stats } from './types';

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

    while (stats.totalBalance > 0 && loans.length > 0) {
        let i = 0;
        let first = true;
        while (i < loans.length && loans.length > 0) {
            let loan = loans[i];
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
        
            if (loan.balance > 0) {
                i++;
            } else {
                stats.payoffOrder.push(loans.shift()?.name as string);
                console.log("Loan paid off: " + loan.name + " on month " + stats.month);
                if (i !== 0) {
                }
                if (loans.length === 0) {
                    break;
                }
            }
        
        }
        if (loans.length > 0) {
            stats.month++;
        }

        if (stats.month > 480) {
            stats.payoffOrder = ["Calculation stopped. The loans entered will take more than 40 years to payoff. Check you minimum payments, interest rates, and extra payment amount."];
            console.error("Breaking out of loop in payoffOrder. The loans will take too long to payoff."); 
            break; 
        }
    }
};