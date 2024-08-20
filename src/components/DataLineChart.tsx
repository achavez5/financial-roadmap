import { LineChart } from '@mui/x-charts';

const stackStrategy = {
    stack: 'total',
    area: true,
    stackOffset: 'none'
} as const;

const DataLineChart = ({sx, data, xKeys, yKeys} : { sx?: any, data: any, xKeys:{key: string, label: string}[], yKeys: {key: string, label: string, stack?: boolean}[]}) => {
    return (
        <LineChart
            xAxis={xKeys.map((x) => {
                return { dataKey: x.key, label: x.label, scaleType: "linear", min: 1 }
            })}
            series={yKeys.map((y) => {
                let stackStrat = y.stack ? stackStrategy : {};
                return {
                dataKey: y.key,
                label: y.label,
                showMark: false,
                ...stackStrat
              }})}
            dataset={data}
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