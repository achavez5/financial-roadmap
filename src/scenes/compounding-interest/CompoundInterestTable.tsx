import CalculatorTable from "../../components/CalculatorTable";
import { GridColDef } from "@mui/x-data-grid";
import { RowProps } from "./index";
import Helpers from "../../libraries/Helpers";

const CompoundInterestTable = ({ table, breakdownByMonth } : { table: RowProps[], breakdownByMonth: boolean}) => {
    const valueFormatter = (params:any) => Helpers.String.FormatToDollar.format(params.value);

    const columns: GridColDef[] = [
        { field: 'id', headerName: (breakdownByMonth ? 'Month' : 'Year'), flex: 0.5 },
        { field: 'potentialValue', headerName: 'Balance', sortable: false, flex: 1, valueFormatter: valueFormatter },
        { field: 'monthlyGrowth', headerName: 'Interest Growth', sortable: false, flex: 1, valueFormatter: valueFormatter },
        { field: 'totalGrowth', headerName: 'Total Growth', sortable: false, flex: 1, valueFormatter: valueFormatter },
    ];
    
    return (
        <CalculatorTable
            columns={columns}
            table={table}
        />
    );
};

export default CompoundInterestTable;