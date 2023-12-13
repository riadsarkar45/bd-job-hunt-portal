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

export default function MyApplication() {
    const axiosSecure = useAxiosSecure();
    const { email } = useParams();
    const { data: application = [], refetch } = useQuery({
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

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Experience&nbsp;(g)</TableCell>
                        <TableCell align="center">Role Name&nbsp;(g)</TableCell>
                        <TableCell align="center">Status&nbsp;(g)</TableCell>
                        <TableCell align="center">Action&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        application?.map(apply =>

                            <TableRow key={apply._id}

                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{'Riad Sarkar'}</TableCell>
                                <TableCell align="center">{apply.email}</TableCell>
                                <TableCell align="center">{apply.experience}</TableCell>
                                <TableCell align="center">{apply.roleName}</TableCell>
                                <TableCell align="center">
                                    {
                                        apply.status === 'pending' ? (
                                            <div className="badge badge-warning badge-outline">Pending</div>
                                        ) : apply.status === 'approve' ? (
                                            <div className="badge badge-success badge-outline">Approved</div>
                                        ) : apply.status === 'reject' ? (
                                            <div className="badge badge-danger badge-outline">Rejected</div>
                                        ) : (
                                            null
                                        )
                                    }
                                </TableCell>
                                <TableCell align="right">
                                    <div className="dropdown dropdown-bottom dropdown-end">
                                        <div tabIndex={0} role="button" className="btn m-1 btn-sm">Click</div>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li onClick={() => handleApplicationStatus(apply._id, 'approve')}><a>Approve</a></li>
                                            <li onClick={() => handleApplicationStatus(apply._id, 'reject')}><a>Reject</a></li>
                                            <li onClick={() => handleDeleteApplication(apply._id)}><a>Delete</a></li>
                                        </ul>
                                    </div>
                                </TableCell>
                            </TableRow>

                        )
                    }

                </TableBody>
            </Table>
        </TableContainer>
    );
}