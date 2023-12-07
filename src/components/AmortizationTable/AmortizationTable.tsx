import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import { Round, GetPaymentAmount } from "../../Libraries/Math_Helpers";

type AmortizationTableProps = {
    loanAmount: number,
    termLength: number,
    interestRate: number
}

const AmortizationTable = (props: AmortizationTableProps) => {
    const { loanAmount, termLength, interestRate } = props;
    
    function generateTable(): React.ReactElement[] {
        let arr: React.ReactElement[] = [];
        let paymentAmount = GetPaymentAmount(loanAmount, interestRate, termLength);
        let balance = loanAmount;
        let total = 0, month = 1;

        while (balance > 0) {
            let interest = Round(balance * (interestRate / 12) / 100, 2);
            let principal = Round(paymentAmount - interest, 2);
            total += Round(paymentAmount, 2);

            arr.push(
                <Tr key={month}>
                    <Td>{month}</Td>
                    <Td>{paymentAmount.toFixed(2)}</Td>
                    <Td>{balance.toFixed(2)}</Td>
                    <Td>{interest.toFixed(2)}</Td>
                    <Td>{principal.toFixed(2)}</Td>
                    <Td>{total.toFixed(2)}</Td>
                </Tr>
            );

            balance -= principal;
            month++;
        }

        return arr;
    }
    return (
        <>
            <TableContainer>
                <Table variant='striped'>
                    <TableCaption placement="top">Amortization schedule</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Month</Th>
                            <Th>Payment</Th>
                            <Th>Balance</Th>
                            <Th>Interest</Th>
                            <Th>Principal</Th>
                            <Th>Total</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {generateTable()}
                    </Tbody>   
                </Table>
            </TableContainer>       
         </>
    )
};

export default AmortizationTable;