import Topbar from "../global/Topbar";
import { Box, Typography } from "@mui/material";

// ### CUSTOM COMPONENTS ###
import Tile from "../../components/Tile";

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
            <Tile
                sx={{
                    margin: "20px",
                }}
            >
                <Typography variant="h2">Snowball Payoff</Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        maxWidth: "75vw",
                        margin: "20px auto 20px auto",
                    }}
                >
                    <Typography variant="h4">Initial Balance: {formatToDollar(initialBalance)}</Typography>
                    <Typography variant="h4">Total Minimums: {formatToDollar(totalMinimumPayments)}</Typography>
                    <Typography variant="h4">Total Payment: {formatToDollar(snowballStats.totalPayment)}</Typography>
                    <Typography variant="h4">Total Interest: {formatToDollar(snowballStats.totalInterest)}</Typography> 
                    <Typography variant="h4">Months: {snowballStats.month}</Typography>
                </Box>            
                <Tile variant="primary">
                    <Typography variant="h3" marginBottom="20px">Payoff Order</Typography>
                    <Typography variant="h5">{snowballStats.payoffOrder.join(", ")}</Typography>
                </Tile> 
            </Tile>
            <Tile
                sx={{
                    margin: "20px",
                }}
            >
                <Typography variant="h2">Avalanche Payoff</Typography>
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            maxWidth: "75vw",
                            margin: "20px auto 20px auto",
                        }}
                    >
                        <Typography variant="h4">Initial Balance: {formatToDollar(initialBalance)}</Typography>
                        <Typography variant="h4">Total Minimums: {formatToDollar(totalMinimumPayments)}</Typography>
                        <Typography variant="h4">Total Payment: {formatToDollar(avalancheStats.totalPayment)}</Typography>
                        <Typography variant="h4">Total Interest: {formatToDollar(avalancheStats.totalInterest)}</Typography> 
                        <Typography variant="h4">Months: {avalancheStats.month}</Typography>
                    </Box>
                </Box>            
                <Tile variant="primary">
                    <Typography variant="h3" marginBottom="20px">Payoff Order</Typography>
                    <Typography variant="h5">{avalancheStats.payoffOrder.join(", ")}</Typography>
                </Tile> 
            </Tile>
        </Box>
    );
};

export default DebtPayoff;