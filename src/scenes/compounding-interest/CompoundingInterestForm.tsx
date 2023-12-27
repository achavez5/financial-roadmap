import { 
    Heading, FormLabel, Input, VStack,
    FormControl, Button, FormErrorMessage,  
    Card, CardHeader, CardBody, CardFooter, useColorModeValue } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

// figure out if there is a better way to handle the states
type CompoundingFormParameters = {
    updatePrincipalAmount: React.Dispatch<React.SetStateAction<number>>,
    updateTermLength: React.Dispatch<React.SetStateAction<number>>,
    updateInterestRate: React.Dispatch<React.SetStateAction<number>>,
    updateMonthlyPayment: React.Dispatch<React.SetStateAction<number>>,
}

const CompoundingInterestForm = ({ updatePrincipalAmount, updateTermLength, updateInterestRate, updateMonthlyPayment }: CompoundingFormParameters) => {

    const formik = useFormik({
        initialValues: {
            principal: "", 
            termLength: "",
            interestRate: "",
            monthlyPayment: "",
        },
        onSubmit: (values) => {
            updatePrincipalAmount(parseFloat(values.principal));
            updateTermLength(parseFloat(values.termLength));
            updateInterestRate(parseFloat(values.interestRate));
            updateMonthlyPayment(parseFloat(values.monthlyPayment));
        },
        validationSchema: Yup.object({
            principal: Yup.number().required("Required").min(0, "Must be at least $0"),
            termLength: Yup.number().required("Required").min(1, `Must be at least 1.`).max(40, "Must be at most 40 years"), 
            interestRate: Yup.number().required("Required").min(0, "ust be at least 0% (cannot have a negative interest rate)"),
            monthlyPayment: Yup.number().min(0, "Must be a non-negative number"),
        }),
      });

    return (
        <Card variant={"elevated"} bg={ useColorModeValue("", "gray.900")}  id="form-card" margin="0 auto">
            <form onSubmit={formik.handleSubmit}>
                <CardBody>
                    <VStack spacing={4}>    
                        <FormControl isInvalid={Boolean(formik.touched.principal && formik.errors.principal)}>
                            <FormLabel htmlFor="principal">Principal amount</FormLabel>
                            <Input
                                id="principal"
                                placeholder="100,000"
                                type="number"
                                {...formik.getFieldProps("principal")}
                            />
                            <FormErrorMessage>{formik.errors.principal}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={Boolean(formik.touched.termLength && formik.errors.termLength)}>
                            <FormLabel htmlFor="termLength">Term length years)</FormLabel>
                            <Input
                                id="termLength"
                                placeholder="30"
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
                        <FormControl isInvalid={Boolean(formik.touched.monthlyPayment && formik.errors.monthlyPayment)}>
                            <FormLabel htmlFor="monthlyPayment">Monthly payment</FormLabel>
                            <Input
                                id="monthlyPayment"
                                placeholder="500"
                                type="number"
                                {...formik.getFieldProps("monthlyPayment")}
                            />                                
                            <FormErrorMessage>{formik.errors.monthlyPayment}</FormErrorMessage>
                        </FormControl>
                    </VStack>
                </CardBody>
                <CardFooter>
                    <Button type="submit" width="full" colorScheme="telegram"  /**</CardFooter>onClick={ handleClick } */>Calculate compounding interest schedule</Button>                
                </CardFooter>
            </form>
        </Card>
    )
};

export default CompoundingInterestForm;