import DataLineChart from "../../components/DataLineChart";
import { RowProps } from "./index";

export const AmortizationChart = ({ table, breakdownByMonth }: { table: RowProps[], breakdownByMonth: boolean }) => {
    return (
        <DataLineChart data={table} xKeys={[{key: "id", label: breakdownByMonth ? "Month" : "Year"}]} yKeys={[{key:"interestRate", label: "Interest", stack: true}, {key: "principalPayment", label: "Principal", stack: true}, {key: "balance", label: "Balance", stack: false}]} />
    );
};

export default AmortizationChart;