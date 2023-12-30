import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../dashboard/authProvider/AuthProvider';
import { useContext } from 'react';

const SideBarJob = ({ jobs }) => {
    const { _id, roleName, salary, jobLocation, companyName } = jobs;
    const { user } = useContext(AuthContext)
    const handleScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    return (
        <div className='border-t-2 mt-3'>
            <Link to={`/detail/${_id}/${user?.email}`} onClick={handleScroll}>
                <div className='p-2 text-xl'>
                    <h2>{roleName}</h2>
                    <p>Salary {salary}</p>
                    <p>Location: ({jobLocation})</p>
                    <p>{companyName}</p>
                </div>
            </Link>
        </div>
    );
};

export default SideBarJob;