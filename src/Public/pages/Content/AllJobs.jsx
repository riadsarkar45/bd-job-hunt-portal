import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SearchIcon from '@mui/icons-material/Search'; import { LinearProgress, Card, CardContent, Typography, Modal, Box, Button } from '@mui/material';
import useAxiosPublic from '../../../components/Hooks/useAxiosPublic';
import AllJobSearch from './AllJobSearch/AllJobSearch';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function AllJobs() {
  const axiosPublic = useAxiosPublic();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [degree] = useState('');
  const [filtJobs, setFiltJobs] = useState([]);
  const [filtLoading, setFiltLoading] = useState(true);
  const [datas] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState(false)
  const [searchResult, setSearchResult] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    axiosPublic.get('/jobs').then((res) => {
      setJobs(res.data);
      setLoading(false);
    });
  }, [axiosPublic]);

  useEffect(() => {
    const filterJobs = jobs?.filter((job) => job.degree === degree);
    setFiltLoading(false);
    setFiltJobs(filterJobs);
  }, [degree, jobs]);

  const handleChangeSearch = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.length >= 0) {
      const filter = jobs?.filter((jo) => jo.roleName?.toLowerCase().includes(value))
      setSearchResult(filter)
      setSearch(true)
    } else {
      setSearch(false)
    }
  };

  const handleChangeJobType = (e) => {
    const value = e.target.value;
    if (value.length >= 0) {
      const filter = jobs?.filter((jo) => jo.type === value)
      setSearchResult(filter)
      setSearch(true)
    } else {
      setSearch(false)
    }
  }

  const handleSearchLocation = (e) => {
    const value = e.target.value;
    if (value.length >= 0) {
      const filter = jobs?.filter((jo) => jo.jobLocation?.toLowerCase().includes(value))
      setSearchResult(filter)
      setSearch(true)
    } else {
      setSearch(false)
    }
  }

  const handleSalarySearch = (e) => {
    const value = e.target.value;
    if (value.length >= 0) {
      const filter = jobs?.filter((jo) => jo.salary?.toLowerCase().includes(value))
      setSearchResult(filter)
      setSearch(true)
    } else {
      setSearch(false)
    }
  }

  return (
    <div>
      <CssBaseline />
      <div className='block sm:hidden mt-[3.9rem] h-full text-center' style={{ zIndex: 1200 }}>
        <button onClick={handleOpen} className=' mt-[5rem] m-auto btn btn-primary btn-sm btn-outline'>Filter</button>

      </div>
      <div className='w-[80%] m-auto font-sans lg:flex md:flex flex'>

        <div className='text-center'>

          <div className='hidden lg:block mt-[8.4rem] h-full shadow-md' style={{ position: 'fixed', width: '15rem', zIndex: 1200 }}>
            <div className='text-center text-blue-200'>
              <FilterAltIcon />
              <p>Filter</p>
            </div>
            <List>
              <ListItem>
                <input type="text" placeholder="Search"
                  value={inputValue}
                  onChange={handleChangeSearch}
                  className="input input-bordered w-full max-w-xs" />
              </ListItem>
            </List>
            <List>
              <ListItem>
                <input type="text" onChange={handleSearchLocation} placeholder="Location" className="input input-bordered w-full max-w-xs" />
              </ListItem>
            </List>
            <List>
              <ListItem>
                <input type="text" onChange={handleSalarySearch} placeholder="Salary" className="input input-bordered w-full max-w-xs" />
              </ListItem>
            </List>
            <List>
              <ListItem>
                <select onChange={handleChangeJobType} className="select select-bordered w-full max-w-xs">
                  <option disabled selected>Select Job Type</option>
                  <option>Work From Home</option>
                  <option>On Office</option>
                  <option>Part Time</option>
                  <option>Full Time</option>
                </select>
              </ListItem>
            </List>
          </div>
        </div>
        <div className='lg:ml-[15rem] lg:flex-grow-[1] lg:mt-[87px] lg:p-[20px]'>
          {loading ? (
            <div className="mt-10">
              <LinearProgress />
            </div>
          ) : (
            <div className="w-full mt-6">
              {filtLoading ? (
                <div className="mt-10">
                  <LinearProgress />
                </div>
              ) : (
                datas ? (
                  filtJobs.map((data) => (
                    <Card key={data._id} className="mb-4">
                      <CardContent>
                        <AllJobSearch data={data} />
                      </CardContent>
                    </Card>
                  ))
                ) : search ? (

                  searchResult.length <= 0 ? (
                    <div className='text-center mt-[10rem] text-red-300 font-sans text-2xl'>
                      <SearchIcon sx={{ fontSize: "64px", color: "red" }} />
                      <p>No result found</p>
                    </div>
                  ) : (
                    searchResult.map((data) => (
                      <Card key={data._id} className="mb-4">
                        <CardContent>
                          <AllJobSearch data={data} />
                        </CardContent>
                      </Card>
                    ))
                  )

                ) : (
                  jobs.map((data) => (
                    <Card key={data._id} className="mb-4">
                      <CardContent>
                        <AllJobSearch data={data} />
                      </CardContent>
                    </Card>
                  ))
                )
              )}
            </div>
          )}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div style={{ width: '100%', zIndex: 1200 }}>
              <div className='text-center text-blue-200'>
                <FilterAltIcon />
                <p>Filter</p>
              </div>
              <List>
                <ListItem>
                  <input type="text" placeholder="Search"
                    value={inputValue}
                    onChange={handleChangeSearch}
                    className="input input-bordered w-full max-w-xs" />
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <input type="text" onChange={handleSearchLocation} placeholder="Location" className="input input-bordered w-full max-w-xs" />
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <input type="text" onChange={handleSalarySearch} placeholder="Salary" className="input input-bordered w-full max-w-xs" />
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <select onChange={handleChangeJobType} className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Select Job Type</option>
                    <option>Work From Home</option>
                    <option>On Office</option>
                    <option>Part Time</option>
                    <option>Full Time</option>
                  </select>
                </ListItem>
              </List>
              <div className='text-center'>
                <button onClick={handleClose} className='btn btn-primary btn-sm btn-outline'>See Result</button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default AllJobs;
