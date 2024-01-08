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
import { Link, Outlet, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAdmin from '../components/Hooks/useAdmin';
import { useContext } from 'react';
import { AuthContext } from './authProvider/AuthProvider';
import useHiring from "../components/Hooks/useHiring";
const drawerWidth = 240;

function Sidebar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isAdmin] = useAdmin();
    const [isHiring] = useHiring();
    console.log(isHiring)
    const navigate = useNavigate();
    const { user, logOut } = useContext(AuthContext)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        logOut()
            .then(() => {
                navigate("/login")
            })
            .catch(error => console.error(error))
    }
    const drawer = (

        <div className='font-sans'>

            <Divider className='mb-10' />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <Link to="/dashboard">Home</Link>
                    </ListItemButton>
                </ListItem>

                {
                    isAdmin ? (
                        <>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PeopleAltIcon></PeopleAltIcon>
                                    </ListItemIcon>
                                    <Link to="/dashboard/all-users">All Users</Link>
                                </ListItemButton>
                            </ListItem>
                        </>
                    ) : (
                        null
                    )
                }

                {
                    isHiring ? (

                        <>

                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <SupportAgentIcon />
                                    </ListItemIcon>
                                    <Link to="/dashboard/addNewJob">Post a job</Link>
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <SupportAgentIcon />
                                    </ListItemIcon>
                                    <Link to={`/dashboard/job-posts/${user?.email}`}>My job posts</Link>
                                </ListItemButton>
                            </ListItem>

                        </>
                    ) : (
                        null
                    )
                }



                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <Link to={`/dashboard/my-application/${user?.email}`}>
                            <ListItemText>My Applications</ListItemText>
                        </Link>
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <Link to={`/dashboard/my-profile/${user?.email}`}>
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
                        <Link onClick={handleLogout}>LogOut</Link>
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
                        <div>
                            <h2 className='font-serif'>SkillSync</h2>
                        </div>

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
                <ToastContainer />
            </Box>
        </Box>
    );
}



export default Sidebar;
