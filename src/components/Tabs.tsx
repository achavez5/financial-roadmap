import { Tab, styled } from "@mui/material";
import { colorTokens } from "../theme";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && children}
      </div>
    );
}

export const StyledTab = styled(Tab)(({ theme }) => {
    const colors = colorTokens(theme.palette.mode);
    return (
        {
            color: colors.grey[100],
            "&.Mui-selected": {
                color: colors.grey[400],
            },
            "&.MuiTab-root": {
                minWidth: "50%",
            }
        }
    )
});