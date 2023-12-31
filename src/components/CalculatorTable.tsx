import { Box, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { colorTokens } from "../theme";

type CalculatorTableProps = {
    table: any[],
    columns: GridColDef[],

}

const CalculatorTable = ({table, columns} : CalculatorTableProps) => {
    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const boxShadow = theme.palette.mode === "dark" ? "0px 0px 10px 0px rgba(0,0,0,0.75)" : "0px 0px 10px 0px rgba(0,0,0,0.25)";

    <Box
            borderRadius="4px"
            id="compounding-box"
            boxShadow={boxShadow}
            maxWidth="100vw"
            minWidth="50vw"
            padding="20px"
            sx={{
                [theme.breakpoints.down("md")]: {
                    margin: "0 auto",
                },
                [theme.breakpoints.up("md")]: {
                    margin: "0 0 0 20px",
                },
            }}
        >
            <DataGrid
                rows={table}
                columns={columns}
                paginationMode="client"
                density="compact"
                isRowSelectable={() => false}
                rowSpacingType={'border'}
                pageSizeOptions={[10, 15, 20, 25]}
                disableColumnFilter
                disableColumnMenu
                disableColumnSelector
                disableEval
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 }},
                }}
                sx={{
                    display: "flex",
                    [`& .MuiDataGrid-columnHeader`]: {
                        backgroundColor: colors.blueAccent[500],
                    },
                }}
            />
       </Box> 
};

export default CalculatorTable;