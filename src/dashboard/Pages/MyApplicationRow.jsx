import { TableCell, TableRow } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const MyApplicationRow = ({ apply, seeResume, handleApplicationStatus, handleDeleteApplication, }) => {
    const { email, experience, roleName, status, _id } = apply;
    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="left">{roleName}</TableCell>
            <TableCell align="left">{email}</TableCell>
            <TableCell align="left">{experience}</TableCell>
            <TableCell align="left">
                {
                    status === 'pending' ? (
                        <div className="badge badge-warning badge-outline">Pending</div>
                    ) : status === 'approve' ? (
                        <div className="badge badge-success badge-outline">Approved</div>
                    ) : status === 'reject' ? (
                        <div className="badge badge-danger badge-outline">Rejected</div>
                    ) : (
                        null
                    )
                }
            </TableCell>
            <TableCell align="left">
                {/* <div className="dropdown dropdown-top">
                    <div tabIndex={0} role="button" className="btn btn-sm m-1">Click</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    </ul>
                </div> */}

                <div className="dropdown dropdown-left dropdown-end flex">
                    <div tabIndex={0} role="button" className="btn btn-sm m-1">
                        Click
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] w-52 p-2 cursor-pointer shadow bg-base-100 rounded-box"
                        
                    >
                        <li onClick={() => seeResume(_id)}>
                            <a>See Resume</a>
                        </li>
                        <li onClick={() => handleApplicationStatus(_id, 'approve')}>
                            <a>Approve</a>
                        </li>
                        <li onClick={() => handleApplicationStatus(_id, 'reject')}>
                            <a>Reject</a>
                        </li>
                        <li onClick={() => handleDeleteApplication(_id)}>
                            <a>Delete</a>
                        </li>
                    </ul>
                </div>





            </TableCell>

        </TableRow>

    );
};

export default MyApplicationRow;