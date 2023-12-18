import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../components/Hooks/useAxiosSecure';
import AllUserRow from './AllUserRow';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';



export default function AllUser() {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    }
  });
  // handleChangeRole, handleDelete

  const handleChangeRole = (_id, role) => {
    axiosSecure.patch(`/user-status/${_id}`, { role })
      .then(res => {
        Swal.fire({
          title: "User role changed!",
          text: "User is now admin!",
          icon: "success"
        });
        refetch();
        console.log(res.data)
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
        axiosSecure.delete(`/user/${_id}`)
          .then(res => {
            Swal.fire({
              title: "User role changed!",
              text: "User is now admin!",
              icon: "success"
            });

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            refetch();
            console.log(res.data)
          })
      }
    });

  }
  return (
    <TableContainer component={Paper}>

      <Helmet>
        <title>All Users</title>
      </Helmet>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">FullName</TableCell>
            <TableCell align="left">Experience&nbsp;(g)</TableCell>
            <TableCell align="left">Role&nbsp;(g)</TableCell>
            <TableCell align="left">Action&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {
            users?.map(user => <AllUserRow handleChangeRole={handleChangeRole} handleDelete={handleDelete} key={user._id} user={user}></AllUserRow>)
          }

        </TableBody>
      </Table>
    </TableContainer>
  );
}