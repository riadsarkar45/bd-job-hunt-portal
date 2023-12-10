import * as React from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Outlet } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { useContext } from "react";
import { AuthContext } from './authProvider/AuthProvider';
import LogoutIcon from '@mui/icons-material/Logout';
import { TextField } from '@mui/material';
import { Toaster } from 'react-hot-toast';
const drawerWidth = 240;

function Sidebar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const authInfo = useContext(AuthContext);
    console.log(authInfo)
    const drawer = (

        <div>
            <div className='mt-2 mb-7 p-3'>
                <TextField className='mt-10' name="search" id="outlined-basic" label="Search" variant="outlined" />
            </div>

            <Divider className='mb-10' />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <Link to="/">Home</Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <WorkHistoryIcon />
                        </ListItemIcon>
                        <Link to="/recruiter">Recruiters</Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SupportAgentIcon />
                        </ListItemIcon>
                        <Link to="/all-jobs">All Jobs</Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SupportAgentIcon />
                        </ListItemIcon>
                        <Link to="/post-a-job">Post A Job</Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <PeopleAltIcon></PeopleAltIcon>
                        </ListItemIcon>
                        <Link to="/all-user">All Users</Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <Link to="/application">
                            <ListItemText>Applications</ListItemText>
                        </Link>
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <Link to="/myProfile">
                            <ListItemText>My Profile</ListItemText>
                        </Link>
                    </ListItemButton>
                </ListItem>

            </List>
            <Divider />
            <List>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon />
                        <LogoutIcon></LogoutIcon>
                        <Link to="/">LouOut</Link>
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        BD Job Hunt

                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Outlet></Outlet>
                <Toaster />
            </Box>
        </Box>
    );
}



export default Sidebar;
