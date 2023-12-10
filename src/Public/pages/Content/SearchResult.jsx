import { Button } from "@mui/material";

const SearchResult = ({ search }) => {
    const { roleName, type, salary, jobLocation } = search

    return (
        <div className="bg-gray-50 mt-2 rounded-md p-5">
            <h2 className="text-3xl">{roleName}</h2>
            <p className="text-gray-500">{type}</p>
            <p className="text-gray-500">{jobLocation}</p>
            <Button variant="contained" size="small">
                Apply
            </Button>
        </div>
    );
};

export default SearchResult;