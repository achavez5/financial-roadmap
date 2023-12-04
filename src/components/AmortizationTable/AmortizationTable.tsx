import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react'

const AmortizationTable = () => {
    function generateTable ():React.ReactElement[] { 
        let arr:React.ReactElement[] = [];
        for (let i = 0; i < 25; i++) {
            let tdArr:React.ReactElement[] = [];
            for (let j = 0; j < 6; j++) {
                tdArr.push(<Td>{j}</Td>)     
            }
            arr.push((
                <Tr>
                    {tdArr}
                </Tr>
            ))
        }
        return arr;
    };
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
                        {/* <Tr>
                            <Td>inches</Td>
                            <Td>millimetres (mm)</Td>
                            <Td isNumeric>25.4</Td>
                        </Tr> */}
                        {generateTable()}
                    </Tbody>   
                </Table>
            </TableContainer>       
         </>
    )
};

export default AmortizationTable;