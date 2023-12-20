import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, 
         Stat, StatNumber, StatLabel, HStack, Card,
         CardHeader, CardBody, useColorModeValue, VStack } from '@chakra-ui/react';
import { Helpers } from "../../Libraries/Helpers";

type CompoundInterestTableProps = {
    principal: number;
    interestRatePercent: number;
    monthlyPayment: number;
    timePeriod: number;
};

type Stats = {
    total: number,
    totalInterest: number,
    totalContribution: number
};

const calculateInterest = (interestRatePercent:number, principal:number) => {
    // Calculation logic goes here    
    let interestRate = interestRatePercent / 100;
    let monthlyInterestRate = interestRate / 12;

    return principal * monthlyInterestRate;
};

const generateTable = (principal:number, interestRatePercent:number, monthlyPayment:number, timePeriod:number, stats:Stats) => {
    const formatToDollar = Helpers.String.FormatToDollar.format;
    
    let arr:React.ReactElement[] = [];
    let timePeriodInMonths = timePeriod * 12;

    for (let i = 0; i < timePeriodInMonths; i++) {
        let monthInterest = calculateInterest(interestRatePercent, stats.total);
        stats.totalInterest += monthInterest; 
        stats.total += monthInterest + monthlyPayment;
        stats.totalContribution += monthlyPayment;
        
        arr.push((
            <Tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{formatToDollar(stats.total)}</Td>
                <Td>{formatToDollar(monthInterest)}</Td>
                <Td>{formatToDollar(stats.totalInterest)}</Td>
            </Tr>
        
        ));
    }
    return (arr); 
};

const CompoundInterestTable = ({ principal, interestRatePercent, monthlyPayment, timePeriod }: CompoundInterestTableProps) => {
    const formatToDollar = Helpers.String.FormatToDollar.format;
    let stats:Stats = {
        total: principal,
        totalInterest: 0,
        totalContribution: principal   
    };

    const table = generateTable(principal, interestRatePercent, monthlyPayment, timePeriod, stats);

    const tableStats = [
        (<Stat><StatLabel>Total:</StatLabel><StatNumber>{formatToDollar(stats.total)}</StatNumber></Stat>),
        (<Stat><StatLabel>Total Contribution:</StatLabel><StatNumber>{formatToDollar(stats.totalContribution)}</StatNumber></Stat>),
        (<Stat><StatLabel>Total Interest:</StatLabel><StatNumber>{formatToDollar(stats.totalInterest)}</StatNumber></Stat>)
    ];

    return (
        <Card variant="elevated" bg={useColorModeValue("", "gray.900")} alignContent={"center"}>
            <CardHeader>
                <HStack background= {useColorModeValue("gray.100", "gray.700")}
                    borderRadius="md"
                    spacing="10px"
                    padding={"10px"}
                    >
                    {tableStats}
                </HStack>
            </CardHeader>
            <CardBody>
                <TableContainer
                    // borderRadius="lg"
                    // boxShadow="lg"
                    // bg={useColorModeValue("white", "gray.800")}
                    // p={3}
                    // mb={4}
                    >
                    <Table variant="striped">
                        <Thead>
                            <Tr>
                                <Th>Month</Th>
                                <Th>Principal</Th>
                                <Th>Interest</Th>
                                <Th>Total</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {table}
                        </Tbody>
                    </Table>
                </TableContainer>
            </CardBody>
        </Card>   
    );

};

export default CompoundInterestTable;