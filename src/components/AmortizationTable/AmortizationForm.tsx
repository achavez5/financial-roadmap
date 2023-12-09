import { 
    Heading, FormLabel, Input, VStack,
    FormControl, Button, FormErrorMessage, Select, 
    Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

// figure out if there is a better way to handle the states
type AmortizationParameters = {
    updateLoanAmount: React.Dispatch<React.SetStateAction<number>>,
    updateTermLength: React.Dispatch<React.SetStateAction<number>>,
    updateInterestRate: React.Dispatch<React.SetStateAction<number>>,
    updateBreakDownByMonth: React.Dispatch<React.SetStateAction<boolean>>,
    updateSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
    breakdownByMonth: boolean,
}

const AmortizationForm = (props: AmortizationParameters) => {
    const { updateLoanAmount, updateTermLength, updateInterestRate, 
            updateBreakDownByMonth, breakdownByMonth, updateSubmitted } = props;
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
            updateSubmitted(true);
        },
        validationSchema: Yup.object({
            loanAmount: Yup.number().required("Required").min(1, "Must be at least $1"),
            termLength: Yup.number().required("Required").min(1, `Must be at least 1 ${breakdownByMonth ? "month": "year"}`).max(breakdownByMonth ? 480 : 40, breakdownByMonth ? "Must be at most 480 months" : "Must be at most 40 years"),
            interestRate: Yup.number().required("Required").min(0, "Must be at least 0% (cannot have a negative interest rate)"),
        }),
      });

    return (
        <Card variant={"elevated"} maxWidth="100%">
            <CardHeader>
                <Heading size="xl">Amortization Calculator</Heading>
            </CardHeader>
            <form onSubmit={formik.handleSubmit}>
                <CardBody>
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
                                placeholder={breakdownByMonth ? "480" : "40"}
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
                            <FormErrorMessage>{formik.errors.interestRate}</FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="breakdownByMonth">Show</FormLabel>
                            <Select
                                id="breakdownByMonth"
                                onChange={() =>  {
                                    let newTermLength =  breakdownByMonth ? parseFloat(formik.values.termLength) / 12 : parseFloat(formik.values.termLength) * 12 ;
                                    if (Boolean(formik.values.termLength) && newTermLength >= 1) {
                                        updateTermLength(newTermLength);
                                        formik.setFieldValue("termLength", newTermLength.toString()); 
                                    } 
                                    updateBreakDownByMonth((prev) => !prev);
                                }}
                            >
                                <option>By year</option>
                                <option>By month</option>
                            </Select>
                        </FormControl>
                    </VStack>
                </CardBody>
                <CardFooter>
                    <Button type="submit" width="full" colorScheme="blue">Calculate amortization schedule</Button>                
                </CardFooter>
            </form>

        </Card>
    )
};

export default AmortizationForm;

