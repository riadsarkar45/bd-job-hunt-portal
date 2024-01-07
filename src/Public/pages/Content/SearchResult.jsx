import { Button } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../dashboard/authProvider/AuthProvider";

const SearchResult = ({ search }) => {
    const { user } = useContext(AuthContext)
    const { roleName, type, salary, jobLocation, _id } = search

    return (
        <div className="bg-gray-50 mt-2 rounded-md p-5">
            <h2 className="text-3xl">{roleName}</h2>
            <p className="text-gray-500">{type}</p>
            <p className="text-gray-500">{jobLocation}</p>
            <Link to={`/detail/${_id}/${user?.email}`}>
                <Button variant="contained" size="small">
                    Apply
                </Button>
            </Link>
        </div>
    );
};

export default SearchResult;