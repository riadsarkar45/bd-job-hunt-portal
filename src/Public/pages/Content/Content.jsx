import { Box, Button, LinearProgress, Modal, TextField } from '@mui/material';
import { Cursor, Typewriter } from 'react-simple-typewriter';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import useAxiosPublic from '../../../components/Hooks/useAxiosPublic'
import { useState } from 'react';
import JobCard from '../JobCard';
import SearchResult from './SearchResult';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
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
        <div className='mt-[10rem] w-[85%] m-auto'>
            <div className='flex justify-between'>
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
                    <p className='text-3xl mt-5'>Find you new job here</p>

                    <form onSubmit={handleSearch}>
                        <div className='mt-10 mb-5 flex gap-5'>
                            <div>
                                <TextField
                                    name='role'
                                    id="outlined-basic"
                                    label="Role"
                                    placeholder='Software Engineer'
                                    variant="outlined"
                                    value={searchRole}
                                    onChange={(e) => setSearchRole(e.target.value)}
                                />
                            </div>
                            <div>
                                <TextField
                                    name='location'
                                    id="outlined-basic"
                                    label="Location"
                                    placeholder='Dhaka'
                                    variant="outlined"
                                    value={searchLocation}
                                    onChange={(e) => setSearchLocation(e.target.value)}
                                />
                            </div>
                            <div className='p-[11px]'>
                                <Button type='submit' variant="contained">Search</Button>
                            </div>
                        </div>
                    </form>

                </div>
                <div>
                    <img
                        className='rounded-[19rem] w-[78%] h-[11rem]'
                        src='https://i.ibb.co/cX6vDPJ/download-3.jpg'
                        alt='engineer'
                    />
                </div>
            </div>

            <div className='mt-10 mb-10'>
                <Swiper
                    slidesPerView={4}
                    centeredSlides={true}
                    spaceBetween={30}
                    grabCursor={true}
                    pagination={{
                        clickable: true,
                    }}
                    className="mySwiper"
                >
                    {
                        loading ? (
                            <div className='mb-10'>
                                <LinearProgress />
                            </div>
                        ) : (
                            <div className='mb-10'>
                                {
                                    jobs?.map(job => <SwiperSlide key={job._id}><JobCard job={job}></JobCard></SwiperSlide>)
                                }
                            </div>
                        )
                    }
                </Swiper>
            </div>

            <div className='flex gap-10 mt-[5rem]'>
                <div>
                    <img className='rounded-md' src="https://i.ibb.co/tmcQ20D/teams-1x.jpg" alt="team" />
                </div>
                <div>
                    <h2>TEAMS</h2>
                    <h2>Find your team</h2>
                    {/* <p>Together, we create access to information and build products for everyone. Want to be a Googler? Find your team.</p> */}
                    <div className='grid grid-cols-2 mb-10 '>
                        <div className='mt-6'>
                            <h2 className='text-2xl text-blue-500'>
                                Engineering and tech
                            </h2>
                            <p>Develop the products and tools of the future for billions of users.</p>
                        </div>
                        <div className='mt-6'>
                            <h2 className='text-2xl text-blue-500'>
                                Sals service and support
                            </h2>
                            <p>Develop the products and tools of the future for billions of users.</p>
                        </div>
                        <div className='mt-6'>
                            <h2 className='text-2xl text-blue-500'>
                                People
                            </h2>
                            <p>Develop the products and tools of the future for billions of users.</p>
                        </div>
                        <div className='mt-6'>
                            <h2 className='text-2xl text-blue-500'>
                                Consumer hardware
                            </h2>
                            <p>Develop the products and tools of the future for billions of users.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal here */}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: '60%', height: "100%", overflowY: 'auto' }}>
                    <h2 id="parent-modal-title">Search Result ({searchResult.length})</h2>
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
                </Box>
            </Modal>

        </div>
    );
}

export default Content;
