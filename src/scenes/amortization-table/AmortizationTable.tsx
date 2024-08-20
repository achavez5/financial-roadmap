import { GridColDef } from "@mui/x-data-grid";
import Helpers from "../../libraries/Helpers";
import CalculatorTable from "../../components/CalculatorTable";
import { useTheme } from "@mui/material";
import { RowProps } from "./index";

const AmortizationTable = ({table, breakdownByMonth}: {table: RowProps[], breakdownByMonth: boolean}) => {
    const theme = useTheme();
    const valueFormatter = (params:any) => Helpers.String.FormatToDollar.format(params.value);

    // store the header to have on top and bottom of table
    const columns: GridColDef[] = [
        { field: 'id', headerName: ( breakdownByMonth ? "Month" : "Year" ), flex: 0.5 },
        { field: 'interestRate', headerName: 'Interest rate', sortable: false, valueFormatter: valueFormatter, flex: 1 },
        { field: 'principalPayment', headerName: 'Principal payment', sortable: false, valueFormatter: valueFormatter, flex: 1 },
        { field: 'balance', headerName: 'Balance', sortable: false, valueFormatter: valueFormatter, flex: 1 },
    ];
    
    return (
        <CalculatorTable columns={columns} table={table} sx={{
            [theme.breakpoints.down("md")]: {
                margin: "0 auto",
            },
            [theme.breakpoints.up("md")]: {
                margin: "none",
            },
        }} />
    );
};

export default AmortizationTable;