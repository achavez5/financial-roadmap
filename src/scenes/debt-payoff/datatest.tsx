import { Loan } from "./types";
import Helpers from "../../libraries/Helpers";
const getPaymentAmount = Helpers.Math.GetPaymentAmount;

export const loans: Loan[] = [
    {
        name: "Student loan 1",
        balance: 5_500,
        interestRate: 3.51,
    },
    {
        name: "Student loan 2",
        balance: 7_500,
        interestRate: 4.2,
    },
    {
        name: "Student loan 3",
        balance: 7_500,
        interestRate: 4.28,
    },
    {
        name: "Student loan 4",
        balance: 3_000,
        interestRate: 2.5,
    },
    {
        name: "Student loan 5",
        balance: 7_500,
        interestRate: 5.050,
    },
];

for (let i = 0; i < loans.length; i++) {
    loans[i].minimumPayment = getPaymentAmount(loans[i].balance, loans[i].interestRate, 120);
}