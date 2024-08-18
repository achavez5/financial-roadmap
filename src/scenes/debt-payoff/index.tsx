import Topbar from "../global/Topbar";
import { Box, Typography } from "@mui/material";

// ### CUSTOM COMPONENTS ###
import Tile from "../../components/Tile";
import FormBox from "../../components/FormBox";
import SubmitButton from "../../components/SubmitButton";
import TextFormInput from "../../components/TextFormInput";

// ### CUSTOM TYPES ###
import { Stats } from "./types";

// ### HELPERS ###
import { loans } from "./datatest"; // TODO: Figure out how to load data
import { avalanchePayoff, snowballPayoff, calculatePayoff} from "./payoff";
import Helpers from "../../libraries/Helpers";
const formatToDollar = Helpers.String.FormatToDollar.format;

const DebtPayoff = () => {

    let extraPayment = 1000; 
    let initialBalance = loans.reduce((sum, loan) => sum + loan.balance, 0);
    let totalMinimumPayments = loans.reduce((sum, loan) => sum + (loan.minimumPayment || 0 ), 0);
    let snowballStats: Stats = {
        totalBalance: initialBalance, 
        totalPayment: 0,
        totalInterest: 0,
        month: 1,
        totalMinimumPayments: totalMinimumPayments,
        payoffOrder: [],
    };
    let avalancheStats: Stats = structuredClone(snowballStats);

    if (extraPayment > 0) {
        snowballPayoff(structuredClone(loans), snowballStats, extraPayment);
        avalanchePayoff(structuredClone(loans), avalancheStats, extraPayment);
    } else {
        // no extra payment === same payoff
        calculatePayoff(structuredClone(loans), snowballStats, 0);
        avalancheStats = structuredClone(snowballStats);
    }

    return (
        <Box>
            <Topbar title="Debt Payoff Calculator" />
            <Box display={"flex"}> 
                <FormBox handleSubmit={()=> null /** TODO: submission */} sx={{margin: "20px"}}>
                    <TextFormInput id="blank" type="text" label="My label" error={false} fieldProps={{}}/>
                    <SubmitButton label="nothing" scrollToId=""/>
                </FormBox>
                <Box>
                    <Typography variant="h2">Snowball Payoff</Typography>
                    <Tile
                        variant="primary"
                        sx={{
                            display: "flex",
                            maxWidth: "75vw",
                            flexDirection: "column",
                            margin: "20px auto 20px auto",
                        }}
                    >
                        <Box sx={{'& .MuiTypography-h4': { marginBottom: "5px"}}}>
                            <Typography variant="body1">Initial Balance: {formatToDollar(initialBalance)}</Typography>
                            <Typography variant="body1">Total Minimums: {formatToDollar(totalMinimumPayments)}</Typography>
                            <Typography variant="body1">Total Payment: {formatToDollar(snowballStats.totalPayment)}</Typography>
                            <Typography variant="body1">Total Interest: {formatToDollar(snowballStats.totalInterest)}</Typography> 
                            <Typography variant="body1">Months: {snowballStats.month}</Typography>
                            <Typography variant="body1">Payoff Order: {snowballStats.payoffOrder.join(", ")}</Typography>
                        </Box>
                    </Tile>
                    <br />
                    <Typography variant="h2">Avalanche Payoff</Typography>
                    <Tile
                        variant="primary"
                        sx={{
                            display: "flex",
                            maxWidth: "75vw",
                            flexDirection: "column",
                            margin: "20px auto 20px auto",
                        }}
                    >
                        <Box sx={{'& .MuiTypography-h4': { marginBottom: "5px"}}}>
                            <Typography variant="body1">Initial Balance: {formatToDollar(initialBalance)}</Typography>
                            <Typography variant="body1">Total Minimums: {formatToDollar(totalMinimumPayments)}</Typography>
                            <Typography variant="body1">Total Payment: {formatToDollar(avalancheStats.totalPayment)}</Typography>
                            <Typography variant="body1">Total Interest: {formatToDollar(avalancheStats.totalInterest)}</Typography> 
                            <Typography variant="body1">Months: {avalancheStats.month}</Typography>
                            <Typography variant="body1">Payoff Order: {avalancheStats.payoffOrder.join(", ")}</Typography>
                        </Box>
                    </Tile>
                </Box>
            </Box>
        </Box>
    );
};

export default DebtPayoff;