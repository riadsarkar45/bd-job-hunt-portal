import { useState } from 'react';
import { MultiSelect } from "react-multi-select-component";
import toast from 'react-hot-toast';
import useAxiosPublic from '../../components/Hooks/useAxiosPublic';
import { useLoaderData, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box, Modal, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
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
const MyProfile = () => {
    const [selected, setSelected] = useState([]);
    const [open1, setOpen1] = useState(false);
    const { email } = useParams();
    const loader = useLoaderData();
    const { skills, resume } = loader;
    const axiosPublic = useAxiosPublic();
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSetResume = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const res = await axiosPublic.post(image_hosting_api, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        const imgUrl = res.data.data.display_url;
        console.log(imgUrl)
        if (res.data.success) {
            axiosPublic.patch(`/user-resume/${email}`, { imgUrl })
                .then(res => {
                    toast.success('Information Saved');
                    console.log(res.data);
                    Swal.fire({
                        title: "Good job!",
                        text: "Now you can match your job and apply!",
                        icon: "success"
                    });
                    handleClose();
                    console.log(res.data)
                })
                .catch(error => {
                    console.error('Error updating user profile:', error);
                });
        }
    };


    const handleUserProfile = (e) => {
        e.preventDefault();
        const skills = selected;
        const dataToInsert = { skills };

        console.log('Updating user profile with data:', dataToInsert);

        axiosPublic.patch(`/users/${email}`, dataToInsert)
            .then(() => {

                Swal.fire({
                    title: "Good job!",
                    text: "Now you can match your job and apply!",
                    icon: "success"
                });
                handleClose1();

            })
            .catch(error => {
                console.error(error.message);
            });
    };



    // modal style

    const options = [
        { label: "React.js", value: "React.js" },
        { label: "Node.js", value: "Node.js" },
        { label: "Python", value: "Python" },
        { label: "Django", value: "Django" },
        { label: "Php", value: "Php" },
    ];
    return (
        <div className='font-sans'>

            <Helmet>
                <title>My Profile</title>
            </Helmet>
            <div className='bg-blue-100 p-3 rounded-md mb-4'>
                <h2 className='text-2xl'>Resume</h2>
                {
                    resume?.length <= 0 ? (
                        <div className='bg-blue-500 bg-opacity-10 text-center border border-sky-500 p-4 rounded-md w-[49%] m-auto'>
                            <p className='font-sans'>
                                Set your resume here make sure your resume is updated
                            </p>
                            <div className='mt-5'>
                                <button onClick={handleOpen} className="badge badge-primary badge-outline text-4xl font-sans p-4"> <BorderColorIcon /> </button>
                            </div>
                        </div>
                    ) : (
                        <div className='bg-blue-500 bg-opacity-10 text-center border border-sky-500 p-4 rounded-md w-[49%] m-auto'>
                            <div>
                                <p>Make sure your resume on update</p>
                            </div>
                            <div className='mt-5'>
                                <button onClick={handleOpen} className="badge badge-primary badge-outline text-4xl font-sans p-4"> <BorderColorIcon /> </button>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className='bg-blue-100 p-3 rounded-md flex justify-between w-full'>
                <div className='w-[30rem]'>
                    <h2 className='mb-4 text-2xl text-gray-600'>Skills</h2>
                    {
                        skills?.length <= 0 ? (

                            <div className='bg-red-200 bg-opacity-50 text-center p-4 m-auto text-2xl text-red-500'>Set Skill to match the job and apply</div>

                        ) : (
                            skills?.map(s =>
                                <div key={s._id} className='bg-yellow-300 p-2 rounded-md mb-1'>
                                    <div className="badge badge-primary badge-outline">{s.label}</div>
                                </div>
                            )
                        )
                    }

                </div>
                <div>
                    <button onClick={handleOpen1} className="badge badge-primary badge-outline text-4xl font-sans p-4"> <BorderColorIcon /> </button>
                </div>
            </div>


            {/* <div className='w-full mt-9'>

                <div className='grid grid-cols-2 gap-2 mt-3'>
                    <input readOnly type="email" value={user?.email} placeholder="Type here" className="input input-bordered w-full" />
                    <input readOnly type="skills" value={`Your skills ${skillString}`} placeholder="Type here" className="input input-bordered w-full" />
                </div>
            </div> */}

            <div>
                <Modal
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <MultiSelect className='w-full'
                                options={options}
                                value={selected}
                                onChange={setSelected}
                                labeledBy="Selecterargragrgre"
                            />
                        </Typography>

                        <div className='text-center mt-6'>
                            <button onClick={handleUserProfile} className='btn btn-outline'>Submit</button>
                        </div>
                    </Box>
                </Modal>
            </div>

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Resume
                        </Typography>
                        <form className='text-center' onSubmit={handleSetResume}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <input type="file" name='image' className="file-input file-input-bordered w-full max-w-xs" />
                            </Typography>
                            <button type='submit' className="btn btn-outline mt-6 btn-accent">Submit</button>
                        </form>

                    </Box>
                </Modal>
            </div>
        </div >


    );
};

export default MyProfile;