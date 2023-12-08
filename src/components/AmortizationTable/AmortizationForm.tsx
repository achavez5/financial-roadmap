import { Box, FormLabel, Input, VStack, FormControl, Button, FormErrorMessage, Select, Card } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

// figure out if there is a better way to handle the states
type AmortizationParameters = {
    updateLoanAmount: React.Dispatch<React.SetStateAction<number>>,
    updateTermLength: React.Dispatch<React.SetStateAction<number>>,
    updateInterestRate: React.Dispatch<React.SetStateAction<number>>,
    updateBreakDownByMonth: React.Dispatch<React.SetStateAction<boolean>>,
    breakdownByMonth: boolean,
}

const AmortizationForm = (props: AmortizationParameters) => {
    const { updateLoanAmount, updateTermLength, updateInterestRate, updateBreakDownByMonth, breakdownByMonth } = props;
    const formik = useFormik({
        initialValues: {
          loanAmount: "", 
          termLength: "",
          interestRate: "",
        },
        onSubmit: (values) => {
            updateLoanAmount(parseFloat(values.loanAmount));
            updateTermLength(parseFloat(values.termLength));
            updateInterestRate(parseFloat(values.interestRate));
        },
        validationSchema: Yup.object({
          loanAmount: Yup.number().required("Required"),
          termLength: Yup.number().required("Required"),
          interestRate: Yup.number().required("Required"),
        }),
      });

    return (
        <Card>
            <VStack>
                <Box p={6} rounded="md" /* TODO: Add drop shadow to give element depth*/>
                    <form onSubmit={formik.handleSubmit}>
                        <VStack spacing={4}>
                            <FormControl isInvalid={Boolean(formik.touched.loanAmount && formik.errors.loanAmount)}>
                                <FormLabel htmlFor="loanAmount">Loan amount</FormLabel>
                                <Input
                                    id="loanAmount"
                                    placeholder="100,000"
                                    type="number"
                                    {...formik.getFieldProps("loanAmount")}
                                />
                                <FormErrorMessage>{formik.errors.loanAmount}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={Boolean(formik.touched.termLength && formik.errors.termLength)}>
                                <FormLabel htmlFor="termLength">Term length ({breakdownByMonth ? "months" : "years"})</FormLabel>
                                <Input
                                    id="termLength"
                                    placeholder="360"
                                    type="number"
                                    {...formik.getFieldProps("termLength")}
                                />                                
                                <FormErrorMessage>{formik.errors.termLength}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={Boolean(formik.touched.interestRate && formik.errors.interestRate)}>
                                <FormLabel htmlFor="interestRate">Yearly interest rate (%)</FormLabel>
                                <Input
                                    id="interestRate"
                                    placeholder="5"
                                    type="number"
                                    {...formik.getFieldProps("interestRate")}
                                />                                
                                <FormErrorMessage>{formik.errors.loanAmount}</FormErrorMessage>
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="breakdownByMonth">Show</FormLabel>
                                <Select
                                    id="breakdownByMonth"
                                    onChange={() => updateBreakDownByMonth((prev) => !prev)}
                                >
                                    <option>By month</option>
                                    <option>By year</option>
                                </Select>
                            </FormControl>
                            <Button type="submit" width="full" colorScheme="blue">
                                Calculate amortization schedule
                            </Button>
                        </VStack>
                    </form>
                </Box>
            </VStack>
        </Card>
    )
};

export default AmortizationForm;

