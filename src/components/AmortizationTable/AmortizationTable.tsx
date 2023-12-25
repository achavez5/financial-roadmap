import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, 
         Stat, StatNumber, StatLabel, HStack, Card,
         CardHeader, CardBody, useColorModeValue, VStack } from '@chakra-ui/react';
import { Helpers } from "../../Libraries/Helpers";
import { AppVariant } from ".";

type AmortizationTableProps = {
    loanAmount: number,
    termLength: number,
    interestRate: number,
    breakdownByMonth: boolean,
    extraPrincipalPayment: number,
    extraYearlyPayment: number,
    variants?: AppVariant,
    accordionToggled?: boolean,
}

type Stats = {
    total: number,
    totalInterest: number
};

function generateTable(loanAmount:number, termLength:number, interestRate:number, extraPrincipalPayment:number, extraYearlyPayment:number, stats:Stats, paymentAmount:number, breakdownByMonth:boolean, variants:AppVariant = { oneColumnApp: true, compactApplication: true }): React.ReactElement[] {
    const formatToDollar = Helpers.String.FormatToDollar.format;
    let yearlyPrincipal = 0, yearlyInterest = 0;

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

        stats.total += principal + interest;
        stats.totalInterest += interest;
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
                    {variants?.compactApplication ? null : (<Td>{formatToDollar(balance)}</Td>) }
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
                {variants?.compactApplication ? null : (<Td>{formatToDollar(balance)}</Td>) }
            </Tr>
        );
    }

    return arr;
}


const AmortizationTable = ({ loanAmount, termLength, interestRate, breakdownByMonth, extraPrincipalPayment, extraYearlyPayment, variants }: AmortizationTableProps) => {
    const formatToDollar = Helpers.String.FormatToDollar.format;
    const paymentAmount = Helpers.Math.GetPaymentAmount(loanAmount, interestRate, breakdownByMonth ? termLength : termLength * 12) + (extraPrincipalPayment || 0);
    const stats:Stats = {
        total: 0, 
        totalInterest: 0 
    };

    // store the header to have on top and bottom of table
    let header = (
        <Thead>
            <Tr>
                <Th>{breakdownByMonth ? "Month" : "Year"}</Th>
                <Th>Interest</Th>
                <Th>Principal</Th>
                {variants?.compactApplication ? null : (<Th>Balance</Th>) }
            </Tr>
        </Thead>
    );
    
    let statStackProps =  {
        background: useColorModeValue("gray.100", "gray.700"),
        borderRadius: "md",
        spacing: "10px",
        padding: variants?.compactApplication ? "5px" : "10px",
        fontSize: variants?.compactApplication ? "sm" : ""
    };

    let table = <Tbody>{generateTable(loanAmount, termLength, interestRate, extraPrincipalPayment, extraYearlyPayment, stats, paymentAmount, breakdownByMonth, variants)}</Tbody>;
    let statsElems = [
        (<Stat key={1} >
            <StatLabel fontSize={statStackProps.fontSize}>Monthly payment</StatLabel>
            <StatNumber fontSize={statStackProps.fontSize}>{formatToDollar(paymentAmount)}</StatNumber>
        </Stat>),
        (<Stat key={2}>
            <StatLabel fontSize={statStackProps.fontSize}>Total paid</StatLabel>
            <StatNumber fontSize={statStackProps.fontSize}>{formatToDollar(stats.total)}</StatNumber>
        </Stat>),
        (<Stat key={3}> 
            <StatLabel fontSize={statStackProps.fontSize}>Total interest</StatLabel>
            <StatNumber fontSize={statStackProps.fontSize}>{formatToDollar(stats.totalInterest)}</StatNumber>
        </Stat>)
    ];
    

    return (
        <>
            <Card variant="elevated" p="" rounded="md" bg= { useColorModeValue("", "gray.900")} margin="0 auto" size={variants?.compactApplication ? "sm" : "md" } id="amortization-table" scrollMarginTop={75} >
                <CardHeader>
                     {variants?.compactApplication ? 
                        <VStack bg={ statStackProps.background } borderRadius={statStackProps.borderRadius} p={statStackProps.padding} spacing={statStackProps.spacing}>
                            {statsElems[0]}
                            <HStack spacing={statStackProps.spacing} width="100%">
                                {statsElems[1]}
                                {statsElems[2]}
                            </HStack>
                        </VStack> : 
                        <HStack bg={ statStackProps.background } borderRadius={statStackProps.borderRadius} p={statStackProps.padding} spacing={statStackProps.spacing}>
                            {statsElems}
                        </HStack>}                         
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