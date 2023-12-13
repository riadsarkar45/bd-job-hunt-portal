import { TableCell, TableRow } from "@mui/material";

const JobRow = ({ job, handleStatusChange, handleDelete }) => {
    const { roleName, jobLocation, experience, vacancys, type, _id, status } = job;
    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="left">{roleName}</TableCell>
            <TableCell align="left">{experience}</TableCell>
            <TableCell align="left">{type}</TableCell>
            <TableCell align="left">{vacancys}</TableCell>
            <TableCell align="left">{jobLocation}</TableCell>
            <TableCell align="left">
                {
                    status === 'stop' ? (
                        <div className="badge badge-warning badge-outline">Hiring Stopped</div>
                    ) : status === 'start' ? (
                        <div className="badge badge-primary badge-outline">Hiring</div>
                    ) : (
                        <div className="badge badge-success badge-outline">Active</div>

                    )
                }
            </TableCell>
            <TableCell align="left">
                <div className="dropdown dropdown-left dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-sm m-1">Click</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li onClick={() => handleStatusChange(_id, 'stop')}><a>Stop Hiring</a></li>
                        <li onClick={() => handleStatusChange(_id, 'start')}><a>Hiring Start</a></li>
                        <li onClick={() => handleDelete(_id)}><a>Delete</a></li>
                    </ul>
                </div>
            </TableCell>

        </TableRow>
    );
};

export default JobRow;