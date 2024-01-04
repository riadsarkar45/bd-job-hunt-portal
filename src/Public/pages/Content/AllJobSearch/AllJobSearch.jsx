import { useContext, useEffect } from "react";
import useAxiosSecure from "../../../../../src/components/Hooks/useAxiosSecure"
import { useState } from "react";
import { AuthContext } from '../../../../dashboard/authProvider/AuthProvider';
import { FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import DangerousIcon from '@mui/icons-material/Dangerous';
import PaymentIcon from '@mui/icons-material/Payment';
const AllJobSearch = ({ data }) => {
    // from job distructer
    const { jobLocation, skill, roleName, _id, companyName, status, salary } = data;
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext)
    const [loggedInUser, setLoggedInUser] = useState([])
    const [,setMappedUser] = useState({})
    const [filt, setFilt] = useState({})
    const [skilll, setSkilll] = useState([])
    const [userSkill, setUserSkill] = useState([])
    const [isMatch, setMatch] = useState('');
    const [isMatchLoading, setMatchLoading] = useState(true)
    const { skills } = filt;
    useEffect(() => {
        axiosSecure.get('/users')
            .then(res => {
                setLoggedInUser(res.data);
                setMatchLoading(false);

            });

    }, [axiosSecure]);

    useEffect(() => {
        loggedInUser?.map(user => setMappedUser(user))
    }, [loggedInUser])

    useEffect(() => {
        if (loggedInUser) {
            setMappedUser(loggedInUser.length > 0 ? loggedInUser[0] : {});

            setSkilll(skill?.map((sk) => sk.label) || []);

            setUserSkill(skills?.map((sks) => sks.label) || []);

            const em = loggedInUser.filter((use) => use.emails === user?.email);
            const updatedFilterUser = em[0] || {};
            setFilt(updatedFilterUser);
        }
    }, [loggedInUser, skill, skills, user?.email]);


    useEffect(() => {



        if (user?.email) {
            const jobSki = skilll
            const userSki = userSkill
            const matching = jobSki?.filter((skillls) => userSki?.includes(skillls));
            setMatch(matching)
        }


    }, [skill, skills, userSkill, skilll, user?.email])

    //console.log(isMatch)
    return (
        <div className="rounded-lg p-5 font-sans">
            <h2 className="text-3xl">{roleName}</h2>

            {
                isMatch?.length <= 0 ? (
                    <div role="alert" className="bg-red-100 gap-3 rounded-md flex p-0 lg:w-[36%] md:w-[33%] mb-3 mt-3">
                        <DangerousIcon className="text-red-500" />
                        <span className="text-[13px] font-sans">Your profile doesn't match this job</span>
                    </div>) : (
                    isMatchLoading ? (
                        <>Loading...</>
                    ) : (
                        <div role="alert" className="bg-green-100 gap-3 rounded-md flex p-0 lg:w-[28%] md:w-[26%] mb-3 mt-3">
                            <FaUserCheck />
                            <span className="text-[13px] font-sans">Your profile match this job</span>
                        </div>
                    )
                )


            }

            <p className="font-sans">{companyName}</p>
            <p className="font-sans"><PaymentIcon/> {salary}</p>
            <p className="font-sans">{jobLocation}</p>
            <div className="mt-4">
                
                    
                        <Link to={`/detail/${_id}/${user?.email}`}>
                            <button className="btn btn-sm btn-outline btn-primary font-sans">Learn More</button>
                        </Link>
                    
                
            </div>
        </div>
    );
};

export default AllJobSearch;

