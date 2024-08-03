import { Loan } from "./types";
import Helpers from "../../libraries/Helpers";
const getPaymentAmount = Helpers.Math.GetPaymentAmount;

export const loans: Loan[] = [
    {
        name: "Student loan 1",
        balance: 2_140,
        interestRate: 3.51,
        minimumPayment: 61,
    },
    {
        name: "Student loan 2",
        balance: 6_640,
        interestRate: 4.2,
        minimumPayment: 80,
    },
    {
        name: "Jeep loan",
        balance: 19_969,
        // balance: 18169,
        interestRate: 6.37,
        minimumPayment: 613,
    },
    // {
    //     name: "Home loan",
    //     balance: 234_963.13,
    //     interestRate: 3.75,
    //     minimumPayment: 1_643.26,
    // }, 
];

for (let i = 0; i < loans.length; i++) {
    if (loans[i].minimumPayment > 0) continue;
    loans[i].minimumPayment = Helpers.Math.Round(getPaymentAmount(loans[i].balance, loans[i].interestRate, 120));
}