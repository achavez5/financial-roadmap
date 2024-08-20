import DataLineChart from "../../components/DataLineChart";
import { RowProps } from "./index";

export const AmortizationChart = ({ table, breakdownByMonth }: { table: RowProps[], breakdownByMonth: boolean }) => {
    return (
        <DataLineChart data={table.map((d: any) => {
            return {
                id: d.id,
                principalPayment: Number(d.principalPayment.toFixed(2)),
                balance: Number(d.balance.toFixed(2)),
                interestRate: Number(d.interestRate.toFixed(2)),
            }
        })} xKeys={[{key: "id", label: breakdownByMonth ? "Month" : "Year"}]} yKeys={[{key:"interestRate", label: "Interest", stack: true}, {key: "principalPayment", label: "Principal", stack: true}, {key: "balance", label: "Balance", stack: false}]} />
    );
};

export default AmortizationChart;