import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer} from '@chakra-ui/react';
import { Helpers } from "../../Libraries/Helpers";

type AmortizationTableProps = {
    loanAmount: number,
    termLength: number,
    interestRate: number,
    breakdownByMonth: boolean,
}

const AmortizationTable = (props: AmortizationTableProps) => {
    const { loanAmount, termLength, interestRate, breakdownByMonth } = props;
    let calculatedTermLength = breakdownByMonth ? termLength : termLength * 12;

    if ((breakdownByMonth && termLength > 360) || (!breakdownByMonth && termLength > 30)) {
        return (
            <>
                <p>Term length must be at most {breakdownByMonth ? 360 : 30} {breakdownByMonth ? "months" : "years"}</p>
            </>
        );
    }
    
    function generateTable(): React.ReactElement[] {
        let Round = Helpers.Math.Round;
        let arr: React.ReactElement[] = [];
        let paymentAmount = Helpers.Math.GetPaymentAmount(loanAmount, interestRate, calculatedTermLength);
        let formatter = Helpers.String.FormatToDollar.format;
        let balance = loanAmount;
        let total = 0, month = 1;

        while (balance > 0) {
            let interest = Round(balance * (interestRate / 12) / 100, 2);
            let principal = Round(paymentAmount - interest, 2);
            total += Round(paymentAmount, 2);

            if (breakdownByMonth || month % 12 === 0) {
                arr.push(
                    <Tr key={month}>
                        <Td>{breakdownByMonth  ? month : month / 12}</Td>
                        <Td>{formatter(paymentAmount)}</Td>
                        <Td>{formatter(balance)}</Td>
                        <Td>{formatter(interest)}</Td>
                        <Td>{formatter(principal)}</Td>
                        <Td>{formatter(total)}</Td>
                    </Tr>
                );
            }

            balance -= principal;
            month++;
        }
        return arr;
    }

    // store the header to have on top and bottom of table
    let header = (
        <Thead>
            <Tr>
                <Th>{breakdownByMonth ? "Month" : "Year"}</Th>
                <Th>Payment</Th>
                <Th>Balance</Th>
                <Th>Interest</Th>
                <Th>Principal</Th>
                <Th>Total</Th>
            </Tr>
        </Thead>
    );

    return (
        <>
            <TableContainer>
                <Table variant='striped'>
                    <TableCaption placement="top">Amortization schedule</TableCaption>
                    {header}
                    <Tbody>
                        {generateTable()}
                    </Tbody>   
                    {header}
                </Table>
            </TableContainer>       
         </>
    );
};

export default AmortizationTable;