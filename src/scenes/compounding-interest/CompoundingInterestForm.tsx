import { useState } from 'react';
import FormBox from '../../components/FormBox';
import TextFormInput from '../../components/TextFormInput';
import SubmitButton from '../../components/SubmitButton';
import { FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";

type CompoundingFormParameters = {
    updatePrincipalAmount: React.Dispatch<React.SetStateAction<number>>,
    updateMonthlyPayment: React.Dispatch<React.SetStateAction<number>>,
    updateTermLength: React.Dispatch<React.SetStateAction<number>>,
    updateInterestRate: React.Dispatch<React.SetStateAction<number>>,
    updateBreakDownByMonth: React.Dispatch<React.SetStateAction<boolean>>,
}

const validationSchema = Yup.object({
        principal: Yup.number().required("Required").min(0, "Must be at least $0"),
        monthlyPayment: Yup.number().min(0, "Must be a non-negative number"),
        termLength: Yup.number().required("Required").min(1, "Must be at least 1 year.").max(40, "Must be at most 40 years"), 
        interestRate: Yup.number().required("Required").min(0, "Must be at least 0% (cannot have a negative interest rate)"),
});

const initialValues = {
    principal: "", 
    monthlyPayment: "",
    termLength: "",
    interestRate: "",
};

const CompoundingInterestForm = ({ updatePrincipalAmount, updateTermLength, updateInterestRate, updateMonthlyPayment, updateBreakDownByMonth }: CompoundingFormParameters) => {
    const [breakdownBy, updateBreakdownBy] = useState("Year");
    
    const onSubmit = (values: {principal: string, termLength: string, interestRate: string, monthlyPayment: string}) => {
        updatePrincipalAmount(parseFloat(values.principal));
        updateMonthlyPayment(parseFloat(values.monthlyPayment));
        updateTermLength(parseFloat(values.termLength));
        updateInterestRate(parseFloat(values.interestRate));
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    return (
        <FormBox handleSubmit={formik.handleSubmit}>
            <TextFormInput
                id="principal"
                type="number"
                label="Initial investment"
                error={Boolean(formik.touched.principal && formik.errors.principal)}
                fieldProps={formik.getFieldProps("principal")}
                adornment={{ position: "start", text: "$" }}
            />
            <TextFormInput
                id="monthlyPayment"
                type="number"
                label="Monthly payment"
                error={Boolean(formik.touched.monthlyPayment && formik.errors.monthlyPayment)}
                fieldProps={formik.getFieldProps("monthlyPayment")}
                adornment={{ position: "start", text: "$" }}
            />
            <Box
                display={"flex"}
                gap={"15px"}
            >
                <TextFormInput
                    id="termLength"
                    type="number"
                    label="Term length"
                    error={Boolean(formik.touched.termLength && formik.errors.termLength)}
                    fieldProps={formik.getFieldProps("termLength")}
                    adornment={{ position: "end", text: "years" }}
                />
                <TextFormInput
                    id="termLength"
                    type="number"
                    label="Term length"
                    error={Boolean(formik.touched.termLength && formik.errors.termLength)}
                    fieldProps={formik.getFieldProps("termLength")}
                    adornment={{ position: "end", text: "years" }}
                />
            </Box>
            <TextFormInput
                id="interestRate"
                type="number"
                label="Projected interest rate"
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
            <SubmitButton label="Calculate compounding interest" />
        </FormBox>
    );
};
    
export default CompoundingInterestForm;