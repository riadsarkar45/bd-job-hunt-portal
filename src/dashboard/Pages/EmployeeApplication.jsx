import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../components/Hooks/useAxiosSecure';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EmAppTableRow from './EmAppTableRow';
import { Helmet } from 'react-helmet-async';
import MyApplication from './MyApplication';
const EmployeeApplication = () => {
    const { email } = useParams();
    const axiosSecure = useAxiosSecure();
    const { data: my_application = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-application/${email}`);
            console.log(res.data)
            return res.data;
        }
    });

    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <TableContainer component={Paper}>
            <Helmet>
                <title>My Applications</title>
            </Helmet>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Role (100g serving)</TableCell>
                        <TableCell align="left">Experience</TableCell>
                        <TableCell align="left">Email&nbsp;(g)</TableCell>
                        <TableCell align="left">Status&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {
                        my_application?.map(appli => <EmAppTableRow key={appli._id} appli={appli}></EmAppTableRow>)
                    } */}
                    {
                        isLoading ? (
                            <p>Loading...</p>
                        ) : Array.isArray(my_application) ?(
                            my_application?.map(appli => <EmAppTableRow key={appli?._id} appli={appli}></EmAppTableRow>)
                        ) : (
                    <TableRow>
                        <TableCell colSpan={5}>No data available</TableCell>
                    </TableRow>
                    )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EmployeeApplication;