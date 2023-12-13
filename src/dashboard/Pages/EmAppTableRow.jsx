import { TableCell, TableRow } from '@mui/material';
import React from 'react';

const EmAppTableRow = ({ appli }) => {
    const { roleName, experience, email, status } = appli;
    return (

        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="left">{roleName}</TableCell>
            <TableCell align="left">{experience}</TableCell>
            <TableCell align="left">{email}</TableCell>
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
        </TableRow>
    );
};

export default EmAppTableRow;