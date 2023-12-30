import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../components/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import MyApplicationRow from './MyApplicationRow';
import { Helmet } from 'react-helmet-async';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function MyApplication() {
    const axiosSecure = useAxiosSecure();
    const [open, setOpen] = useState(false);
    const [getResume, setResume] = useState([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { email } = useParams();

    const { data: application = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/application/${email}`);
            return res.data;
        }
    });
    const handleApplicationStatus = (_id, status) => {
        axiosSecure.patch(`/application/${_id}`, { status })
            .then(res => {
                refetch();
                console.log(res.data)
            }
            )
    }

    const handleDeleteApplication = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/application/${_id}`)
                    .then(() => {
                        refetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })

            }
        });

    }

    const seeResume = (_id) => {
        const filter = application?.filter(appli => appli._id === _id);
        setResume(filter)
        handleOpen();
    }

    return (
        <TableContainer className='mt-10' component={Paper}>

            <Helmet>
                <title>Applicants</title>
            </Helmet>

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name (100g servdghing)</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Experience&nbsp;(g)</TableCell>
                        <TableCell align="left">Status&nbsp;(g)</TableCell>
                        <TableCell align="left">Action&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        application?.map(apply => <MyApplicationRow key={apply._id} apply={apply} seeResume={seeResume} handleApplicationStatus={handleApplicationStatus} handleDeleteApplication={handleDeleteApplication}></MyApplicationRow>)
                    }
                </TableBody>
            </Table>

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
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {
                                getResume?.map((resume) => (
                                    <div key={resume._id}>
                                        {
                                            resume?.resume?.length <= 0 ? (
                                                <h2>No resume found</h2>
                                            ) : (
                                                <img
                                                    className="w-full h-full p-5 object-cover mt-[40rem]"

                                                    src={resume.resume}
                                                    alt=""
                                                    style={{ objectPosition: 'center bottom' }}
                                                />
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </TableContainer>
    );
}