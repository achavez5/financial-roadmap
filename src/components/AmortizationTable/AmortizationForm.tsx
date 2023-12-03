import { Box, Heading, FormLabel, Input, VStack, FormControl, Button} from "@chakra-ui/react";

const AmortizationForm = () => {
    return (
        <Box>
            <VStack>
                <Heading as="h1" id="formHeading">
                    Amortization Table  
                </Heading>
                <Box p={6} rounded="md" backgroundColor={"#424242"} /**TODO: adjust the background color to match the theme | TODO: Add drop shadow to give element depth*/>
                    <VStack spacing={4}>
                        <FormControl>
                            <FormLabel htmlFor="loan-amount">Loan amount</FormLabel>
                            <Input
                                id="loan-amount"
                                name="loan-amount"
                                placeholder="100,000"
                                type="number"
                                // TODO: hookup formik stuffs
                                >
                            </Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="term-length">Term length (months)</FormLabel>
                            <Input
                                id="term-length"
                                name="term-length"
                                placeholder="360"
                                type="number"
                                // TODO: hookup formik stuffs
                                >
                            </Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="interest-rate">Yearly interest rate</FormLabel>
                            <Input
                                id="interest-rate"
                                name="interest-rate"
                                placeholder="5"
                                type="number"
                                // TODO: hookup formik stuffs
                                >
                            </Input>
                        </FormControl>
                        <Button type="submit" width="full" colorScheme="blue">
                            Calculate amortization schedule
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Box>
    )
};

export default AmortizationForm;

