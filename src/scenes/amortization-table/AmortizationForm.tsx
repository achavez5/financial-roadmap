import { useState } from "react";

// ### custom components/context ###
import FormBox from "../../components/FormBox";
import TextFormInput from "../../components/TextFormInput";
import SubmitButton from "../../components/SubmitButton";
 
// ### formik form validation ###
import { useFormik } from "formik";
import * as Yup from "yup";

// ### mui ### 
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { 
    Box, FormControl, InputLabel, Select, MenuItem,
    Accordion, AccordionSummary, AccordionDetails, Typography 
}  from "@mui/material";

// figure out if there is a better way to handle the states
type AmortizationParameters = {
    updateLoanAmount: React.Dispatch<React.SetStateAction<number>>,
    updateTermLength: React.Dispatch<React.SetStateAction<number>>,
    updateInterestRate: React.Dispatch<React.SetStateAction<number>>,
    updateBreakDownByMonth: React.Dispatch<React.SetStateAction<boolean>>,
    updateExtraMonthlyPayment: React.Dispatch<React.SetStateAction<number>>,
    updateExtraYearlyPayment: React.Dispatch<React.SetStateAction<number>>,
}

const validationSchema = Yup.object({
    loanAmount: Yup.number().required("Required").min(1, "Must be at least $1"),
    termLengthYears: Yup.number()
        .required("Required")
        .min(1, `Must be at least 1 year`)
        .max(40, "Must be less than 40 years"),
    termLengthMonths: Yup.number()
        .required("Required")
        .min(0, "Must be at least 0 months")
        .max(11, "Must be less than 12 months"),
    interestRate: Yup.number().required("Required").min(0, "Must be at least 0% (cannot have a negative interest rate)"),
    extraPrincipalPayment: Yup.number().min(0, "Must be a non-negative number"),
    extraYearlyPayment: Yup.number().min(0, "Must be a non-negative number"), 
});

const AmortizationForm = ({ updateLoanAmount, updateTermLength, updateInterestRate, updateBreakDownByMonth, updateExtraMonthlyPayment, 
    updateExtraYearlyPayment } : AmortizationParameters) => {
    const [breakdownBy, updateBreakdownBy] = useState("Year");

    const formik = useFormik({
        initialValues: {
            loanAmount: "", 
            termLengthYears: "",
            termLengthMonths: "",
            interestRate: "",
            extraMonthlyPayment: "",
            extraYearlyPayment: "",
        },
        onSubmit: (values) => {
            const termLength = (parseFloat(values.termLengthYears) * 12) + parseFloat(values.termLengthMonths);

            updateLoanAmount(parseFloat(values.loanAmount));
            updateTermLength(termLength);
            updateInterestRate(parseFloat(values.interestRate));
            updateExtraMonthlyPayment(parseFloat(values.extraMonthlyPayment) || 0);
            updateExtraYearlyPayment(parseFloat(values.extraYearlyPayment) || 0);
        },
        validationSchema: validationSchema,
    });

    return (
        <FormBox handleSubmit={formik.handleSubmit}>
            <TextFormInput
                id="loanAmount"
                type="number"
                label="Loan amount"
                error={Boolean(formik.touched.loanAmount && formik.errors.loanAmount)}
                fieldProps={formik.getFieldProps("loanAmount")}
                adornment={{ position: "start", text: "$" }}
            />
            <Box display="flex" sx={{gap: "10px"}}>
                <TextFormInput
                    id="termLengthYears"
                    type="number"
                    label="Term length in years"
                    error={Boolean(formik.touched.termLengthYears && formik.errors.termLengthYears)}
                    fieldProps={formik.getFieldProps("termLengthYears")}
                    adornment={{ position: "end", text: "years" }}
                />
                <TextFormInput
                    id="termLengthMonths"
                    type="number"
                    label="Term length in months"
                    error={Boolean(formik.touched.termLengthMonths && formik.errors.termLengthMonths)}
                    fieldProps={formik.getFieldProps("termLengthMonths")}
                    adornment={{ position: "end", text: "months" }}
                />
            </Box>
            <TextFormInput
                id="interestRate"
                type="number"
                label="Interest rate"
                error={Boolean(formik.touched.interestRate && formik.errors.interestRate)}
                fieldProps={formik.getFieldProps("interestRate")}
                adornment={{ position: "end", text: "%" }}
            />
            <FormControl fullWidth>
                <InputLabel id="breakdownBy">Breakdown by</InputLabel>
                <Select
                    labelId="breakdownBy"
                    id="breakdownBy"
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
            <SubmitButton label="Calculate amortization table" />
            <Accordion 
                sx={{
                    width: "100%",
                    backgroundColor: "rgba(0,0,0,0)",
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
                    <TextFormInput
                        id="extraMonthlyPayment"
                        type="number"
                        label="Extra monthly payment"
                        error={Boolean(formik.touched.extraMonthlyPayment && formik.errors.extraMonthlyPayment)}
                        fieldProps={formik.getFieldProps("extraMonthlyPayment")}
                        adornment={{ position: "start", text: "$" }}
                        margin="0 0 20px 0"
                    />
                    <TextFormInput
                        id="extraYearlyPayment"
                        type="number"
                        label="Extra yearly payment"
                        error={Boolean(formik.touched.extraYearlyPayment && formik.errors.extraYearlyPayment)}
                        fieldProps={formik.getFieldProps("extraYearlyPayment")}
                        adornment={{ position: "start", text: "$" }}
                    />
                </AccordionDetails>
            </Accordion>
        </FormBox>

    );
};
export default AmortizationForm;