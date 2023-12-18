import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { LinearProgress, Card, CardContent } from '@mui/material';
import useAxiosPublic from '../../../components/Hooks/useAxiosPublic';
import AllJobSearch from './AllJobSearch/AllJobSearch';

function AllJobs() {
  const axiosPublic = useAxiosPublic();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [degree, setDegree] = useState('');
  const [filtJobs, setFiltJobs] = useState([]);
  const [filtLoading, setFiltLoading] = useState(true);
  const [datas, setData] = useState(false);

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

  return (
    <div style={{ display: 'flex' }} className='w-[80%] m-auto font-sans'>
      <CssBaseline />
      <div className='mt-[6.9rem] h-full shadow-md' style={{ position: 'fixed', width: '15rem', zIndex: 1200 }}>
        <List>
          <ListItem>
            <input type="text" placeholder="Search" className="input input-bordered w-full max-w-xs" />
          </ListItem>
        </List>
        <List>
          <ListItem>
            <input type="text" placeholder="Location" className="input input-bordered w-full max-w-xs" />
          </ListItem>
        </List>
        <List>
          <ListItem>
            <input type="text" placeholder="Salary" className="input input-bordered w-full max-w-xs" />
          </ListItem>
        </List>
        <List>
          <ListItem>
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>Select Job Type</option>
              <option>Work From Home</option>
              <option>On Office</option>
              <option>Part Time</option>
            </select>          </ListItem>
        </List>
      </div>
      <div style={{ marginLeft: '15rem', flexGrow: 1, marginTop: '64px', padding: '20px' }}>
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
  );
}

export default AllJobs;
