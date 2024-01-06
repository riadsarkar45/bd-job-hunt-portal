import { Box, Button, LinearProgress, Modal, TextField } from '@mui/material';
import { Cursor, Typewriter } from 'react-simple-typewriter';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import useAxiosPublic from '../../../components/Hooks/useAxiosPublic'
import { useState } from 'react';
import JobCard from '../JobCard';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchResult from './SearchResult';
import SearchIcon from '@mui/icons-material/Search';
import { Helmet } from 'react-helmet-async';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
function Content() {
    const [loading, setLoading] = useState(true)
    const [jobs, setJobs] = useState([])
    const [searchRole, setSearchRole] = useState('')
    const [searchLocation, setSearchLocation] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [searchLoading, setSearchLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const axiosPublic = useAxiosPublic();
    axiosPublic.get('/jobs')
        .then(res => {
            setJobs(res.data)
            setLoading(false)
        })

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(searchLocation, searchRole);
        // Perform filtering based on conditions
        setOpen(true);
        const result = jobs?.filter(result =>
            (!searchLocation || result.jobLocation?.toLowerCase().includes(searchLocation.toLowerCase())) &&
            (!searchRole || result.roleName === searchRole)
        );
        setSearchResult(result || []);
        setSearchLoading(false)
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className='font-sans mt-[10rem] w-[85%] m-auto'>
            <Helmet>
                <title>BD Hunt || Find your next job here</title>
            </Helmet>
            <div className='lg:flex md:flex justify-between'>
                <div>
                    <h2 className='text-5xl'>
                        <Typewriter
                            words={['Code', 'Build', 'Make']}
                            loop={500}
                            cursor
                            cursorStyle='_'
                            typeSpeed={80}
                            deleteSpeed={70}
                            delaySpeed={1000}
                        />
                        <Cursor />
                    </h2>
                    <h2 className='text-5xl'>For Everyone</h2>
                    <p className='text-3xl mt-5'>Find your new tech job here</p>

                    

                </div>
                <div>
                    <img
                        className='rounded-[19rem] w-[78%] h-[11rem]'
                        src='https://i.ibb.co/cX6vDPJ/download-3.jpg'
                        alt='engineer'
                    />
                </div>
            </div>
            <form onSubmit={handleSearch}>

                <div className='shadow-md mt-10 mb-10 bg-blue-200 bg-opacity-25 p-3 rounded-md flex items-center w-full m-auto '>
                    <div className='p-3'>
                        <SearchIcon />
                    </div>
                    <div>
                        <input
                            value={searchRole}
                            onChange={(e) => setSearchRole(e.target.value)}
                            type="text" placeholder="Job Title"
                            className="input  w-[27rem]" />
                    </div>
                    <div className='p-3'>
                        <MyLocationIcon />
                    </div>
                    <div>

                        <input
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                            type="text"
                            placeholder="Location"
                            className="input  w-[27rem]" />
                    </div>
                    <div className='p-[11px]'>
                        <Button type='submit' variant="contained">Search</Button>
                    </div>
                </div>

            </form>

            {/* modal here */}


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: '60%', height: "100%", overflowY: 'auto' }}>
                    <h2 id="parent-modal-title">({searchResult.length})  jobs matched</h2>
                    {
                        searchResult.length <= 0 ?
                            (
                                <div className='text-center mt-[20rem]'>
                                    <div className='bg-blue-500 rounded-lg bg-opacity-10 p-1 text-black w-[4rem] m-auto'>
                                        <SearchIcon className='text-9xl' />
                                    </div>
                                    <h2 className='text-3xl mt-6'>No results</h2>
                                </div>
                            ) : (
                                <div className='w-full'>
                                    {
                                        searchLoading ? (
                                            <>
                                                <LinearProgress />
                                            </>
                                        ) : (
                                            searchResult?.map(search => <SearchResult key={search._id} search={search}></SearchResult>)
                                        )
                                    }
                                </div>
                            )
                    }
                </Box>
            </Modal>


        </div>
    );
}

export default Content;
