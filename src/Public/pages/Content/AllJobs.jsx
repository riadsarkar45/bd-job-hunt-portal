import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FormControl, LinearProgress, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import useAxiosPublic from '../../../components/Hooks/useAxiosPublic';
import AllJobSearch from './AllJobSearch/AllJobSearch';
import { useEffect } from 'react';

const drawerWidth = 380;

function AllJobs(props) {
    const axiosPublic = useAxiosPublic();
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [degree, setDegree] = useState('');
    const [filtJobs, setFiltJobs] = useState([]);
    const [filtLoading, setFiltLoading] = useState(true)
    const [datas, setData] = useState(false)
    const handleChange = (event) => {
      setDegree(event.target.value);
      setData(true)
    };
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
      const filterJobs = jobs?.filter(job => job.degree === degree);
      setFiltLoading(false)
      setFiltJobs(filterJobs)
    }, [degree, jobs]);

  useEffect(() => {
    axiosPublic.get('/jobs')
      .then(res => {
          setJobs(res.data)
          setLoading(false)
    })
  }, [axiosPublic])


  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
          {/* <ListItem>
          <FormControl sx={{ m: 1, minWidth: 335 }}>
      <Select
        value={degree}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="">
          <em>Sort Degree</em>
        </MenuItem>
        <MenuItem value="Pursuing degree">Pursuing degree</MenuItem>
        <MenuItem value="Associate">Associate</MenuItem>
        <MenuItem value="Bachelors">Bachelors</MenuItem>
        <MenuItem value="Master">Master</MenuItem>
        <MenuItem value="Ph.D">Ph.D</MenuItem>
      </Select>
    </FormControl>
            
          </ListItem> */}
          <ListItem>
           {/* <FormControl sx={{ m: 1, minWidth: 335 }}>
           <TextField
            value={inputLocation}
            onChange={handleInputLocation}
            id="outlined-basic" label="Location" variant="outlined" />

            </FormControl> */}


            More features will availlabel soon....
            
          </ListItem>
          <ListItem>
           {/* <FormControl sx={{ m: 1, minWidth: 335 }}>
           <TextField id="outlined-basic" label="Outlined" variant="outlined" />

            </FormControl> */}
            
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
            All Jobs
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

        <Typography>
          {
            loading ? (
              <div className='mt-10'><LinearProgress /></div>
            ) : (
              <div className='w-full mt-6'>
                {
                  filtLoading ? (
                    <div className='mt-10'><LinearProgress /></div>
                  ) : (
                    datas ? (
                      filtJobs.map(data => <AllJobSearch key={data._id} data={data} />)
                    ) : (
                      jobs.map(data => <AllJobSearch key={data._id} data={data} />)
                    )
                  )
                }
              </div>
            )
          }  
        </Typography>
      </Box>
    </Box>
  );
}


export default AllJobs;

// const AllJobs = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default AllJobs;