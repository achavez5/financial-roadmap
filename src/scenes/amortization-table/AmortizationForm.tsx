import { useState } from "react";
import { colorTokens } from '../../theme';
import { useTheme, Box, FormControl, InputLabel,
         FilledInput, InputAdornment, Select, MenuItem,
         Accordion, AccordionSummary, AccordionDetails,
         Typography, Button
} from "@mui/material";
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useFormik } from "formik";
import * as Yup from "yup";

// figure out if there is a better way to handle the states
type AmortizationParameters = {
    updateLoanAmount: React.Dispatch<React.SetStateAction<number>>,
    updateTermLength: React.Dispatch<React.SetStateAction<number>>,
    updateInterestRate: React.Dispatch<React.SetStateAction<number>>,
    updateBreakDownByMonth: React.Dispatch<React.SetStateAction<boolean>>,
    updateExtraMonthlyPayment: React.Dispatch<React.SetStateAction<number>>,
    updateExtraYearlyPayment: React.Dispatch<React.SetStateAction<number>>,
    breakdownByMonth: boolean,
}

const AmortizationForm = ({ updateLoanAmount, updateTermLength, updateInterestRate, updateBreakDownByMonth, updateExtraMonthlyPayment, 
    updateExtraYearlyPayment, breakdownByMonth }: AmortizationParameters) => {

    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode); 
    const [breakdownBy, updateBreakdownBy] = useState("Year");

    const formik = useFormik({
        initialValues: {
            loanAmount: "", 
            termLength: "",
            interestRate: "",
            extraMonthlyPayment: "",
            extraYearlyPayment: "",
        },
        onSubmit: (values) => {
            updateLoanAmount(parseFloat(values.loanAmount));
            updateTermLength(parseFloat(values.termLength));
            updateInterestRate(parseFloat(values.interestRate));
            updateExtraMonthlyPayment(parseFloat(values.extraMonthlyPayment));
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

    const handleClick = () => {
        const element = document.getElementById("amortization-table");
        const { loanAmount, termLength, interestRate } = formik.values;

        if (element && loanAmount && termLength && interestRate) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <>
            <Box 
                borderRadius="4px"
                id="amortization-box"
                boxShadow={theme.palette.mode === "dark" ? "0px 0px 10px 0px rgba(0,0,0,0.75)" : "0px 0px 10px 0px rgba(0,0,0,0.25)"}
                sx={{ display: "flex", flexWrap: "wrap", gap: "10px", padding: "20px"}} 
                maxWidth="30vw" // TODO: make this responsive
            >
                <FormControl fullWidth variant="filled">
                    <InputLabel htmlFor="loanAmount">Loan amount</InputLabel>
                    <FilledInput
                        id="loanAmount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        {...formik.getFieldProps("loanAmount")}
                    />
                </FormControl>
                <FormControl fullWidth variant="filled">
                    <InputLabel htmlFor="termLength">Term length ({breakdownByMonth ? "month" : "years"})</InputLabel>
                    <FilledInput
                        id="termLength"
                        {...formik.getFieldProps("termLength")}
                    />
                </FormControl>
                <FormControl fullWidth variant="filled">
                    <InputLabel htmlFor="interestRate">Yearly interest rate</InputLabel>
                    <FilledInput
                        id="interestRate"
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        {...formik.getFieldProps("interestRate")}
                    />
                </FormControl>
                <FormControl fullWidth variant="filled">
                    <InputLabel id="filled-breakdown">Breakdown by</InputLabel>
                    <Select
                        labelId="filled-breakdown"
                        id="filled-breakdown"
                        label="Breakdown by"
                        value={breakdownBy}
                        onChange={(e) =>  {
                            let newBreakdownByMonth = e.target.value as string === "Month";
                            updateBreakDownByMonth(newBreakdownByMonth);
                            updateBreakdownBy(newBreakdownByMonth ? "Month" : "Year");
                        }}
                    >
                        <MenuItem value="Year">Year</MenuItem>
                        <MenuItem value="Month">Month</MenuItem>
                    </Select>
                </FormControl>
                <Button 
                    variant="contained" 
                    sx={{background: colors.blueAccent[500], width:"100%"}}
                    onClick={handleClick}
                >
                    Calculate amortization schedule
                </Button>
                <Accordion 
                    sx={{
                        width: "100%",
                        backgroundColor: "rgba(0,0,0,0.0)",
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreOutlinedIcon />}
                        aria-controls="additional-options"
                        id="additional-options"
                    >
                        <Typography>Additional options</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl fullWidth variant="filled" sx={{m:1, ml:0}}>
                            <InputLabel htmlFor="extra-monthly-payment">Extra monthly payment</InputLabel>
                            <FilledInput
                                id="extra-monthly-payment"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                {...formik.getFieldProps("extraMonthlyPayment")}
                            />
                        </FormControl>
                        <FormControl fullWidth variant="filled" sx={{m:1, ml:0}}>
                            <InputLabel htmlFor="extra-yearly-payment">Loan amount</InputLabel>
                            <FilledInput
                                id="extra-yearly-payment"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                {...formik.getFieldProps("extraYearlyPayment")}
                            />
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </>

    );
};

export default AmortizationForm;

        // <Card variant={"elevated"} bg={ useColorModeValue("", "gray.900")}  id="form-card" margin="0 auto">
        //     <form onSubmit={formik.handleSubmit}>
        //         <CardBody>
        //             <VStack spacing={4}>    
        //                 <FormControl isInvalid={Boolean(formik.touched.loanAmount && formik.errors.loanAmount)}>
        //                     <FormLabel htmlFor="loanAmount">Loan amount</FormLabel>
        //                     <Input
        //                         id="loanAmount"
        //                         placeholder="100,000"
        //                         type="number"
        //                         {...formik.getFieldProps("loanAmount")}
        //                     />
        //                     <FormErrorMessage>{formik.errors.loanAmount}</FormErrorMessage>
        //                 </FormControl>
        //                 <FormControl isInvalid={Boolean(formik.touched.termLength && formik.errors.termLength)}>
        //                     <FormLabel htmlFor="termLength">Term length ({breakdownByMonth ? "months" : "years"})</FormLabel>
        //                     <Input
        //                         id="termLength"
        //                         placeholder={breakdownByMonth ? "360" : "30"}
        //                         type="number"
        //                         {...formik.getFieldProps("termLength")}
        //                     />                                
        //                     <FormErrorMessage>{formik.errors.termLength}</FormErrorMessage>
        //                 </FormControl>
        //                 <FormControl isInvalid={Boolean(formik.touched.interestRate && formik.errors.interestRate)}>
        //                     <FormLabel htmlFor="interestRate">Yearly interest rate (%)</FormLabel>
        //                     <Input
        //                         id="interestRate"
        //                         placeholder="5"
        //                         type="number"
        //                         {...formik.getFieldProps("interestRate")}
        //                     />                                
        //                     <FormErrorMessage>{formik.errors.interestRate}</FormErrorMessage>
        //                 </FormControl>
        //                 <FormControl>
        //                     <FormLabel htmlFor="breakdownByMonth">Show</FormLabel>
        //                     <Select
        //                         id="breakdownByMonth"
        //                         onChange={() =>  {
        //                             let newTermLength =  breakdownByMonth ? parseFloat(formik.values.termLength) / 12 : parseFloat(formik.values.termLength) * 12 ;
        //                             if (Boolean(formik.values.termLength) && newTermLength >= 1) {
        //                                 updateTermLength(newTermLength);
        //                                 formik.setFieldValue("termLength", newTermLength.toString()); 
        //                             } 
        //                             updateBreakDownByMonth((prev) => !prev);
        //                             formik.setFieldTouched("termLength", true, true);
        //                             formik.setFieldTouched("breakDownByMonth", true, true);
        //                         }}
        //                     >
        //                         <option>By year</option>
        //                         <option>By month</option>
        //                     </Select>
        //                 </FormControl>
        //             </VStack>
        //         </CardBody>
        //         <Accordion id="additional-options" allowToggle >
        //             <AccordionItem>
        //                 <h2>
        //                     <AccordionButton _hover={ {background: accordionHoverColor }}>
        //                         <Box as="span" flex='1' textAlign='left'>Advanced options</Box>
        //                         <AccordionIcon />
        //                     </AccordionButton>
        //                 </h2>
        //                 <AccordionPanel pb={4} bg={accordionPanelColor}  padding="20px" dropShadow="inner" borderRadius="medium">
        //                     <VStack spacing={4}>
        //                         <FormControl>
        //                             <FormLabel htmlFor="extraPrincipalPayment">Extra monthly principal payment</FormLabel>
        //                             <Input
        //                                 id="extraPrincipalPayment"
        //                                 placeholder="0"
        //                                 type="number"
        //                                 {...formik.getFieldProps("extraPrincipalPayment")}
        //                             />                                
        //                         </FormControl>
        //                         <FormControl >
        //                             <HStack spacing="0">
        //                                     <FormLabel htmlFor="extraYearlyPayment" >Extra yearly payment</FormLabel>
        //                                     {/**  TODO: fix this janky tooltip*/}
        //                                     <Tooltip label='Extra payment is placed on 12th month of each year' placement='right-start'>
        //                                         <span><InfoOutlineIcon fontSize={"sm"}/></span>
        //                                     </Tooltip>
        //                             </HStack>
        //                             <Input
        //                                 id="extraYearlyPayment"
        //                                 placeholder="Extra yearly payment"
        //                                 type="text"
        //                                 {...formik.getFieldProps("extraYearlyPayment")}
        //                             />                                
        //                         </FormControl>
        //                     </VStack>
        //                 </AccordionPanel>
        //             </AccordionItem>
        //         </Accordion>
        //         <CardFooter>
        //             <Button type="submit" width="full" colorScheme="telegram" onClick={ handleClick }>Calculate amortization schedule</Button>                
        //         </CardFooter>
        //     </form>
        // </Card>