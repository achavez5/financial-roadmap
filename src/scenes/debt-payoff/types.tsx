export type Loan = {
    name: string;
    balance: number;
    minimumPayment?: number;
    interestRate: number;
};

export type Stats = {
    totalBalance: number;
    totalPayment: number;
    totalInterest: number;
    month: number;
    totalMinimumPayments: number;
    payoffOrder: string[];
};