import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, 
         Stat, StatNumber, StatLabel, HStack, Card,
         CardHeader, CardBody, useColorModeValue } from '@chakra-ui/react';
import { Helpers } from "../../Libraries/Helpers";

type AmortizationTableProps = {
    loanAmount: number,
    termLength: number,
    interestRate: number,
    breakdownByMonth: boolean,
    extraPrincipalPayment: number,
    extraYearlyPayment: number,
}

const AmortizationTable = ({ loanAmount, termLength, interestRate, breakdownByMonth, extraPrincipalPayment, extraYearlyPayment }: AmortizationTableProps) => {
    const calculatedTermLength = breakdownByMonth ? termLength : termLength * 12;
    const paymentAmount = Helpers.Math.GetPaymentAmount(loanAmount, interestRate, calculatedTermLength) + (extraPrincipalPayment || 0);
    const formatToDollar = Helpers.String.FormatToDollar.format;
    let total = 0, totalInterest = 0, yearlyPrincipal = 0, yearlyInterest = 0;
    
    function generateTable(): React.ReactElement[] {
        let arr: React.ReactElement[] = [];
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

            total += principal + interest;
            totalInterest += interest;
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
                    <Tr key={month}>
                        <Td>{breakdownByMonth  ? month : month / 12}</Td>
                        <Td>{formatToDollar(breakdownByMonth ? interest : yearlyInterest)}</Td>
                        <Td>{formatToDollar(breakdownByMonth ? principal: yearlyPrincipal)}</Td>
                        <Td>{formatToDollar(balance)}</Td>
                    </Tr>
                );
            }
            month++;
        }

        if ((extraPrincipalPayment > 0 || extraYearlyPayment > 0) && !breakdownByMonth) {
            arr.push(
                <Tr key={month}>
                    <Td>{Math.ceil(month / 12)}</Td>
                    <Td>{formatToDollar(yearlyInterest)}</Td>
                    <Td>{formatToDollar(yearlyPrincipal)}</Td>
                    <Td>{formatToDollar(balance)}</Td>
                </Tr>
            );
        }

        return arr;
    }

    // store the header to have on top and bottom of table
    let header = (
        <Thead>
            <Tr>
                <Th>{breakdownByMonth ? "Month" : "Year"}</Th>
                <Th>Interest</Th>
                <Th>Principal</Th>
                <Th>Balance</Th>
            </Tr>
        </Thead>
    );

    let table = <Tbody>{generateTable()}</Tbody>;

    return (
        <>
            <Card variant="elevated" p="6" rounded="md" bg= { useColorModeValue("", "gray.900")}>
                <CardHeader>
                    <HStack bg={ useColorModeValue("gray.100", "gray.700")} borderRadius="md" p="10px" spacing="10x">
                        <Stat>
                            <StatLabel>Monthly payment</StatLabel>
                            <StatNumber>{formatToDollar(paymentAmount)}</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel>Total paid</StatLabel>
                            <StatNumber>{formatToDollar(total)}</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel>Total interest</StatLabel>
                            <StatNumber>{formatToDollar(totalInterest)}</StatNumber>
                        </Stat>
                    </HStack>
                </CardHeader>
                <CardBody>
                    <TableContainer borderRadius="sm">
                        <Table variant='striped'>
                            {header}
                            {table}
                        </Table>
                    </TableContainer>
                </CardBody>
            </Card>
         </>
    );
};

export default AmortizationTable;