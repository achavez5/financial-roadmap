export function Round(numberToBeRounded: number, precision: number): number {
    return Math.round(numberToBeRounded * Math.pow(10, precision)) / Math.pow(10, precision);
}

export function GetPaymentAmount(principalPayment: number, interestRate: number, termLengthInMonths: number): number {
    let monthlyInterestRate = (interestRate / 100) / 12; 
    let numerator = principalPayment * monthlyInterestRate;
    let denominator = (1.0 - Math.pow(1.0 + monthlyInterestRate, -(termLengthInMonths)));
    
    return numerator / denominator;
}
