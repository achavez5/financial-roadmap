import { useState } from 'react';

import { colorTokens } from '../../theme';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme, Link} from '@mui/material'

/** #### ICONS #### */
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';

type ItemProps = {
    title: string,
    to: string, 
    icon: React.ReactNode,
    selected: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>,
}

const Item = ({title, icon, selected, setSelected, to}: ItemProps) => {
    const theme = useTheme(); 
    const colors = colorTokens(theme.palette.mode);
    return (
        <MenuItem 
            active={selected === title} 
            style={{color: colors.grey[100]}}
            onClick={() => setSelected(title)}
            icon={icon}
            component={<Link href={to}/>}
            rootStyles= {{
                ":hover": {
                    backgroundColor: colors.primary[400],
                    color: "white",
                }
            }}
        >
            {title}
        </MenuItem>
    );
}


const AppSidebar = () => {
    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const [collapsed, setCollapsed] = useState(true);    
    const [selected, setSelected] = useState('Dashboard');

    return (
        <>
            <Sidebar 
                collapsed={collapsed}
                rootStyles={{
                    [`.${sidebarClasses.container}`]:{
                        backgroundColor: "rgba(0,0,0,0)",
                    },
                }}
                style={{
                    height: "100%",
                    border: "none",
                }}
            >
                <Menu>
                    <MenuItem 
                        onClick={() => setCollapsed(!collapsed)}
                        icon = {collapsed ? <MenuOutlinedIcon /> : null }
                        style={{
                            color: colors.grey[100],
                        }}
                    >
                    {
                        !collapsed &&  (
                            <Box
                                display="flex"
                                justifyContent={"space-between"}
                                alignItems="center"
                            >
                                <Typography variant="h4" color={colors.grey[100]}>Tools</Typography>
                                <IconButton onClick = {() => setCollapsed(!collapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )
                    }
                    </MenuItem>
                    <Item 
                        title="Home"
                        icon={<HomeOutlinedIcon />}
                        selected={selected}
                        to="/financial-roadmap/#/home"
                        setSelected={setSelected}
                    />
                    <Item 
                        title="Amortization Calculator"
                        icon={<SignalCellularAltOutlinedIcon sx={{transform:"scaleX(-1)"}}/>} // flip the icon horizontally
                        selected={selected}
                        to="/financial-roadmap/#/amortization"
                        setSelected={setSelected}
                    />
                    <Item 
                        title="Compound Interest Calculator"
                        icon={<SignalCellularAltOutlinedIcon/>}
                        selected={selected}
                        to="/financial-roadmap/#/compound-interest"
                        setSelected={setSelected}
                    />
                    <Item 
                        title="Budget app"
                        icon={<AssessmentOutlinedIcon/>}
                        selected={selected}
                        to="/financial-roadmap/#/budget"
                        setSelected={setSelected}
                    />
                    <Item 
                        title="Debt payoff"
                        icon={<CreditCardOffOutlinedIcon/>}
                        selected={selected}
                        to="/financial-roadmap/#/debt-payoff"
                        setSelected={setSelected}
                    />
                    
                </Menu>
            </Sidebar>
        </>
    );
}

export default AppSidebar;
