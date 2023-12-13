import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../dashboard/authProvider/AuthProvider';

const drawerWidth = 240;

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const { user, logOut } = useContext(AuthContext)
  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/login")
      })
      .catch(error => console.error(error))
  }
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link to="/">
              <Button sx={{ color: '#fff' }}>
                Home
              </Button>
            </Link>
            {
              user ? (

                <>
                  <Link onClick={handleLogout}>
                    <Button sx={{ color: '#fff' }}>
                      Logout
                    </Button>
                  </Link>

                  <Link onClick={handleLogout}>
                    <Button sx={{ color: '#fff' }}>
                      Logout
                    </Button>
                  </Link>
                </>
              ) : (

                <Link to="/login">
                  <Button sx={{ color: '#fff' }}>
                    Login
                  </Button>
                </Link>
              )
            }
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Bd Job Hunt
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Link to="/">
              <Button sx={{ color: '#fff' }}>
                Home
              </Button>
            </Link>
          </Box>
          {
            user ? (
              <>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Link to="/allJobs">
                    <Button sx={{ color: '#fff' }}>
                      All Jobs
                    </Button>
                  </Link>

                </Box>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Link onClick={handleLogout}>
                    <Button sx={{ color: '#fff' }}>
                      Logout
                    </Button>
                  </Link>

                </Box></>
            ) : (
              <></>
            )
          }
        </Toolbar>
      </AppBar>
      <nav>
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
      </nav>
    </Box>
  );
}


export default Header;