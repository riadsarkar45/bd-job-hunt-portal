import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLoaderData, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../components/Hooks/useAxiosSecure';
import JobRow from './JobRow';
import Swal from 'sweetalert2'


export default function EmployerJobs() {
    const axiosSecure = useAxiosSecure();
    const { email } = useParams();
    console.log(email)
    const { data: job = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/jobs-hiring/${email}`);
            console.log(res.data)
            return res.data;
        }
    });

    const handleStatusChange = (_id, status) => {
        axiosSecure.patch(`/job-status/${_id}`, { status })
            .then(res => {
                console.log(res.data)
                refetch();
                Swal.fire({
                    title: "Status Changed!",
                    text: "You have changed the hiring status!",
                    icon: "success"
                });
            })
    }

    const handleDelete = (_id) => {
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
                axiosSecure.delete(`/jobs/${_id}`)
                    .then(res => {
                        console.log(res.data)

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch()
                    })
            }
        });

    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Role</TableCell>
                        <TableCell align="left">Experience&nbsp;(g)</TableCell>
                        <TableCell align="left">Type&nbsp;(g)</TableCell>
                        <TableCell align="left">Vacancy&nbsp;(g)</TableCell>
                        <TableCell align="left">Location&nbsp;(g)</TableCell>
                        <TableCell align="left">Status&nbsp;(g)</TableCell>
                        <TableCell align="left">Action&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {
                        job?.map(job => <JobRow handleStatusChange={handleStatusChange} handleDelete={handleDelete} key={job._id} job={job}></JobRow>)
                    }

                </TableBody>
            </Table>
        </TableContainer>
    );
}