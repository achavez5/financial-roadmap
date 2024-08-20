import DataLineChart from "../../components/DataLineChart";
import { RowProps } from "./index";

export const CompoundInterestChart = ({ table, breakdownByMonth, startingValue }: { table: RowProps[], breakdownByMonth: boolean, startingValue: number }) => {
    return (
        <DataLineChart data={table.map((d: RowProps) => {
            return {
                id: d.id,
                potentialValue: Number(d.potentialValue.toFixed(2)),
                totalGrowth: Number(d.totalGrowth.toFixed(2)),
                totalMonthlyContributions: Number((d.totalMonthlyContributions + startingValue).toFixed(2)),
            }
        })} 
        xKeys={[
            {
                key: "id",
                label: breakdownByMonth ? "Month" : "Year"
            }
        ]} 
        yKeys={[
            { key: "totalGrowth", label: "Total growth", stack: true }, 
            { key: "totalMonthlyContributions", label: "Contributions", stack: true },
            { key: "potentialValue", label: "Balance", stack: false },
        ]} />
    );
};

export default CompoundInterestChart;