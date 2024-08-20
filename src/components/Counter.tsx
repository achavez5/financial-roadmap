import { Box, Typography } from '@mui/material';

const Counter = ({ label, amount }: { label: string, amount: number | string }) => 
{
    return (
        <Box display="flex" flexWrap="wrap">
            <Typography variant="h3" align='center'>{label}<br/>{amount}</Typography>
        </Box>
    );
};

export default Counter;