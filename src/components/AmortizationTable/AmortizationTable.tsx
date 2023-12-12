import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, 
         Stat, StatNumber, StatLabel, HStack, Card,
         CardHeader, CardBody, useColorMode } from '@chakra-ui/react';
import { Helpers } from "../../Libraries/Helpers";

type AmortizationTableProps = {
    loanAmount: number,
    termLength: number,
    interestRate: number,
    breakdownByMonth: boolean,
}

const AmortizationTable = (props: AmortizationTableProps) => {
    const { loanAmount, termLength, interestRate, breakdownByMonth } = props;
    const { colorMode } = useColorMode();
    const calculatedTermLength = breakdownByMonth ? termLength : termLength * 12;
    const paymentAmount = Helpers.Math.GetPaymentAmount(loanAmount, interestRate, calculatedTermLength);
    const formatToDollar = Helpers.String.FormatToDollar.format;
    let total = 0, totalInterest = 0, yearlyPrincipal = 0, yearlyInterest = 0;
    
    function generateTable(): React.ReactElement[] {
        let arr: React.ReactElement[] = [];
        let balance = loanAmount;
        let month = 1;

        while (balance > 0) {
            let interest = balance * (interestRate / 12) / 100;
            let principal = paymentAmount - interest;
            
            // handle last payment
            if (balance - principal < 0) {
                principal = balance;
            }

            total += principal + interest;
            totalInterest += interest;
            balance -= principal;

            if(!breakdownByMonth ) {
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
            <Card boxShadow="inner" p="6" rounded="md" bg= { colorMode === "light" ? "" : "gray.900"}>
                <CardHeader>
                    <HStack bg={ colorMode === "light" ? "#EDF2F7": "#2D3748"} borderRadius="md" p="10px" spacing="10x">
                        <Stat dropShadow={"inner"}>
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