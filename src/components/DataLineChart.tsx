import { LineChart } from '@mui/x-charts';
import { useMemo } from 'react';

const stackStrategy = {
    stack: 'total',
    area: true,
    stackOffset: 'none'
} as const;

const DataLineChart = ({sx, data, xKeys, yKeys} : { sx?: any, data: any, xKeys:{key: string, label: string}[], yKeys: {key: string, label: string, stack?: boolean}[]}) => {
    useMemo(() => {
        console.log(data)
    }, [data]);
    return (
        <LineChart
            xAxis={xKeys.map((x) => {
                return {dataKey: x.key, label: x.label, scaleType: "linear", min: 1}
            })}
            series={yKeys.map((y) => {
                let stackStrat = y.stack ? stackStrategy : {};
                return {
                dataKey: y.key,
                label: y.label,
                showMark: false,
                ...stackStrat
              }})}
            dataset={data.map((d: any) => {
                return {
                    id: d.id,
                    principalPayment: Number(d.principalPayment.toFixed(2)),
                    balance: Number(d.balance.toFixed(2)),
                    interestRate: Number(d.interestRate.toFixed(2)),
                }
            })}
            height={400}
            width={600}
            disableAxisListener={true}
            sx={{
                ...sx
            }}
        />
    )
};

export default DataLineChart;