import FormBox from '../../components/FormBox';
import TextFormInput from '../../components/TextFormInput';
import SubmitButton from '../../components/SubmitButton';
import { useFormik } from "formik";
import * as Yup from "yup";

type CompoundingFormParameters = {
    updatePrincipalAmount: React.Dispatch<React.SetStateAction<number>>,
    updateMonthlyPayment: React.Dispatch<React.SetStateAction<number>>,
    updateTermLength: React.Dispatch<React.SetStateAction<number>>,
    updateInterestRate: React.Dispatch<React.SetStateAction<number>>,
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

const CompoundingInterestForm = ({ updatePrincipalAmount, updateTermLength, updateInterestRate, updateMonthlyPayment }: CompoundingFormParameters) => {
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
                label="Loan amount"
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
            <TextFormInput
                id="termLength"
                type="number"
                label="Monthly payment"
                error={Boolean(formik.touched.termLength && formik.errors.termLength)}
                fieldProps={formik.getFieldProps("termLength")}
                adornment={{ position: "end", text: "years" }}
            />
            <TextFormInput
                id="interestRate"
                type="number"
                label="Monthly payment"
                error={Boolean(formik.touched.interestRate && formik.errors.interestRate)}
                fieldProps={formik.getFieldProps("interestRate")}
                adornment={{ position: "end", text: "%" }}
            />
            <SubmitButton label="Calculate compounding interest" />
        </FormBox>
    );
};
    
export default CompoundingInterestForm;