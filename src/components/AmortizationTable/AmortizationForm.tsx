import { 
    Heading, FormLabel, Input, VStack,
    FormControl, Button, FormErrorMessage, Select, 
    Card, CardHeader, CardBody, CardFooter, useColorModeValue,
    Accordion, AccordionButton, AccordionItem, AccordionPanel, AccordionIcon,
    Box, Tooltip, HStack} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppVariant } from "./AmortizationApp";

// figure out if there is a better way to handle the states
type AmortizationParameters = {
    updateLoanAmount: React.Dispatch<React.SetStateAction<number>>,
    updateTermLength: React.Dispatch<React.SetStateAction<number>>,
    updateInterestRate: React.Dispatch<React.SetStateAction<number>>,
    updateBreakDownByMonth: React.Dispatch<React.SetStateAction<boolean>>,
    updateExtraPrincipalPayment: React.Dispatch<React.SetStateAction<number>>,
    updateExtraYearlyPayment: React.Dispatch<React.SetStateAction<number>>,
    breakdownByMonth: boolean,
    variants?: AppVariant,
}

const AmortizationForm = ({ updateLoanAmount, updateTermLength, updateInterestRate, updateBreakDownByMonth, updateExtraPrincipalPayment, 
    updateExtraYearlyPayment, breakdownByMonth, variants }: AmortizationParameters) => {

    const formik = useFormik({
        initialValues: {
            loanAmount: "", 
            termLength: "",
            interestRate: "",
            extraPrincipalPayment: "",
            extraYearlyPayment: "",
        },
        onSubmit: (values) => {
            updateLoanAmount(parseFloat(values.loanAmount));
            updateTermLength(parseFloat(values.termLength));
            updateInterestRate(parseFloat(values.interestRate));
            updateExtraPrincipalPayment(parseFloat(values.extraPrincipalPayment));
            updateExtraYearlyPayment(parseFloat(values.extraYearlyPayment));
        },
        validationSchema: Yup.object({
            loanAmount: Yup.number().required("Required").min(1, "Must be at least $1"),
            termLength: Yup.number()
                           .required("Required")
                           .min(1, `Must be at least 1 ${breakdownByMonth ? "month": "year"}`)
                           .max(breakdownByMonth ? 480 : 40,
                                breakdownByMonth ? 
                                    "Must be at most 480 months"  
                                    : "Must be at most 40 years"
                            ),
            interestRate: Yup.number().required("Required").min(0, "Must be at least 0% (cannot have a negative interest rate)"),
            extraPrincipalPayment: Yup.number().min(0, "Must be a non-negative number"),
            extraYearlyPayment: Yup.number().min(0, "Must be a non-negative number"), 
        }),
      });

    const accordionHoverColor = useColorModeValue("gray.200", "gray.600");
    const accordionPanelColor = useColorModeValue("gray.100", "gray.700");

    const handleClick = () => {
        const element = document.getElementById("amortization-table");
        const { loanAmount, termLength, interestRate } = formik.values;

        if (element && variants && variants?.oneColumnApp && loanAmount && termLength && interestRate) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };
    

    return (
        <Card variant={"elevated"} bg={ useColorModeValue("", "gray.900")}  id="form-card" margin="0 auto">
            <form onSubmit={formik.handleSubmit}>
                <CardHeader>
                    <Heading size="lg">Amortization Calculator</Heading>
                </CardHeader>
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
                                placeholder={breakdownByMonth ? "360" : "30"}
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
                                    formik.setFieldTouched("termLength", true, true);
                                    formik.setFieldTouched("breakDownByMonth", true, true);
                                }}
                            >
                                <option>By year</option>
                                <option>By month</option>
                            </Select>
                        </FormControl>
                    </VStack>
                </CardBody>
                <Accordion id="additional-options" allowToggle >
                    <AccordionItem>
                        <h2>
                            <AccordionButton _hover={ {background: accordionHoverColor }}>
                                <Box as="span" flex='1' textAlign='left'>Advanced options</Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} bg={accordionPanelColor}  padding="20px" dropShadow="inner" borderRadius="medium">
                            <VStack spacing={4}>
                                <FormControl>
                                    <FormLabel htmlFor="extraPrincipalPayment">Extra monthly principal payment</FormLabel>
                                    <Input
                                        id="extraPrincipalPayment"
                                        placeholder="0"
                                        type="number"
                                        {...formik.getFieldProps("extraPrincipalPayment")}
                                    />                                
                                </FormControl>
                                <FormControl >
                                    <HStack spacing="0">
                                            <FormLabel htmlFor="extraYearlyPayment" >Extra yearly payment</FormLabel>
                                            {/**  TODO: fix this janky tooltip*/}
                                            <Tooltip label='Extra payment is placed on 12th month of each year' placement='right-start'>
                                                <span><InfoOutlineIcon fontSize={"sm"}/></span>
                                            </Tooltip>
                                    </HStack>
                                    <Input
                                        id="extraYearlyPayment"
                                        placeholder="Extra yearly payment"
                                        type="text"
                                        {...formik.getFieldProps("extraYearlyPayment")}
                                    />                                
                                </FormControl>
                            </VStack>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
                <CardFooter>
                    <Button type="submit" width="full" colorScheme="telegram" onClick={ handleClick }>Calculate amortization schedule</Button>                
                </CardFooter>
            </form>
        </Card>
    )
};

export default AmortizationForm;

