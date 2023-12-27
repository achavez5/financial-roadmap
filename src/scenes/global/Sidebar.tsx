import { useState } from 'react';

import { colorTokens } from '../../theme';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme, Link} from '@mui/material'

/** #### ICONS #### */
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';

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
                        background: theme.palette.mode === "dark" ? colors.primary[400] : "",
                    },
                }}
                style={{
                    height: "100%",
                    border: "none",
                }}
            >
                <Menu menuItemStyles={{
                    root: {
                        
                    },
                    
                }}>
                    <MenuItem 
                        onClick={() => setCollapsed(!collapsed)}
                        icon = {collapsed ? <MenuOutlinedIcon /> : null }
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                    {
                        !collapsed &&  (
                            <Box
                                display="flex"
                                justifyContent={"space-between"}
                                alignItems="center"
                                ml="15px"
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
                        title="Dashboard"
                        icon={<HomeOutlinedIcon />}
                        selected={selected}
                        to="/"
                        setSelected={setSelected}
                    />
                    <Item 
                        title="Amortization Calculator"
                        icon={<AssessmentOutlinedIcon />}
                        selected={selected}
                        to="/#/amortization"
                        setSelected={setSelected}
                    />
                    <Item 
                        title="Compound Interest Calculator"
                        icon={<SignalCellularAltOutlinedIcon/>}
                        selected={selected}
                        to="/#/compound-interest"
                        setSelected={setSelected}
                    />
                    
                </Menu>
            </Sidebar>
        </>
    );
}

export default AppSidebar;
