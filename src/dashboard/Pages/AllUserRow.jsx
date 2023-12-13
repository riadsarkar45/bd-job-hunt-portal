import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';

const AllUserRow = ({ user, handleChangeRole, handleDelete }) => {
    const { role, emails, fullName, _id } = user;
    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="left">{fullName}</TableCell>
            <TableCell align="left">{emails}</TableCell>
            <TableCell align="left">
                {
                    role === 'admin' ? (
                        <h2>Admin</h2>
                    ) : (
                        <h2>User</h2>
                    )
                }
            </TableCell>
            <TableCell align="left">
                <div className="dropdown dropdown-left dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-sm m-1">Click</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li onClick={() => handleChangeRole(_id, 'admin')}><a>Make Admin</a></li>
                        <li onClick={() => handleChangeRole(_id, 'user')}><a>Make User</a></li>
                        <li onClick={() => handleDelete(_id)}><a>Delete</a></li>
                    </ul>
                </div>
            </TableCell>

        </TableRow>


    );
};

export default AllUserRow;