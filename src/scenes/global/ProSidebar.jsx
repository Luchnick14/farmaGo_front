import { useContext, useState } from 'react';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { Box, IconButton, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloudIcon from '@mui/icons-material/Cloud';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { colors } from '../../styles/colorPalette';
import { AuthContext } from '../../utils/AuthContext';

const Item = ({ title, to, icon, setSelected }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
            <MenuItem
                active={isActive}
                onClick={() => setSelected(title)}
                icon={icon}
                style={{
                    backgroundColor: isActive ? colors.primary : 'transparent'
                }}
            >
                <Typography color='aliceblue'>{title}</Typography>
            </MenuItem>
        </Link>
    )
};

const ProSidebar = () => {
    const { logout } = useContext(AuthContext);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const [selected, setSelected] = useState(location.pathname);


    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    return (
        <Box display={'flex'} height={'100%'}>
            <Sidebar
                collapsed={isCollapsed}
                rootStyles={{
                    [`.${sidebarClasses.container}`]: {
                        backgroundColor: '#0d425d',
                        borderColor: '#0d425d'
                    },
                }}
            >
                <Menu
                    iconShape='square'
                    menuItemStyles={{
                        button: {
                            padding: '5px 35px 5px 30px',
                            backgroundColor: '#0d425d',
                            ['&:hover']: {
                                backgroundColor: '#2678a1fc'                        
                            },
                            [`&.active`]: {
                                color: `${colors.light} !important`
                            }
                        }
                    }}
                >
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <ArrowForwardIosIcon sx={{ color: 'aliceblue'}} /> : undefined }
                            
                    >
                        {!isCollapsed && (
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} ml={'15px'}>
                                <IconButton 
                                    sx={{
                                        display: 'flex',
                                        gap: '1.5rem'
                                    }}
                                    onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <Typography variant='h5' color='aliceblue'>
                                        Menu
                                    </Typography>
                                    <ArrowBackIosNewIcon sx={{ color: 'aliceblue'}} />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                <Box pl={isCollapsed ? undefined : '5%'}>
                    <Item 
                        title='Weather'
                        to='/dashboard'
                        icon={<CloudIcon sx={{color: `${colors.accent}`}} />}
                        setSelected={setSelected}
                    />
                    <Item 
                        title='Users'
                        to='/users'
                        icon={<PersonIcon sx={{color: `${colors.accent}`}} />}
                        setSelected={setSelected}
                    />
                     {/* Botón de Logout */}
                    <MenuItem
                        onClick={handleLogout}
                        icon={<ExitToAppIcon sx={{color: `${colors.accent}`}} />}
                    >
                        <Typography color='aliceblue'>Logout</Typography>
                    </MenuItem>
                </Box>
                </Menu>
            </Sidebar>
        </Box>
    )
}

export default ProSidebar;