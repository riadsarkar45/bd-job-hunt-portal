import { useContext, useEffect } from "react";
import useAxiosSecure from "../../../../../src/components/Hooks/useAxiosSecure"
import { useState } from "react";
import { AuthContext } from '../../../../dashboard/authProvider/AuthProvider';
import { FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
const AllJobSearch = ({ data }) => {
    // from job distructer
    const { jobLocation, skill, roleName, _id } = data;
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext)
    const [loggedInUser, setLoggedInUser] = useState([])
    const [mappedUser, setMappedUser] = useState({})
    const [filt, setFilt] = useState({})
    const [skilll, setSkilll] = useState([])
    const [userSkill, setUserSkill] = useState([])
    const [isMatch, setMatch] = useState('');
    const [isMatchLoading, setMathLoading] = useState(true)
    const { email } = mappedUser;
    const { emails, skills } = filt;
    useEffect(() => {
        axiosSecure.get('/users')
            .then(res => {
                setLoggedInUser(res.data);
                setMathLoading(false)

            });

    }, [axiosSecure]);

    useEffect(() => {
        //const userEmail = loggedInUser.length > 0 ? loggedInUser[0].email : null;
        loggedInUser?.map(user => setMappedUser(user))
    }, [loggedInUser])

    useEffect(() => {
        loggedInUser?.map(user => user)
        const em = loggedInUser?.filter((use) => use.emails === user?.email)
        const updatedFilterUser = em?.[0] || {};
        setFilt(updatedFilterUser);

    }, [skills, skill, skilll, loggedInUser])

    useEffect(() => {


        // job requirement
        setSkilll(
            skill?.map((sk) => sk.label)
        )
        // user skills
        setUserSkill(
            skills?.map((sks) => (sks.label))
        )

        const jobSki = skilll
        const userSki = userSkill
        const matching = jobSki?.filter((skillls) => userSki?.includes(skillls));
        setMatch(matching)
        setMathLoading(false)
    }, [skill, skills, userSkill])

    //console.log(isMatch)
    return (
        <div className="bg-gray-50 rounded-lg shadow-md mt-4 p-5">
            <h2 className="text-3xl">{roleName}</h2>

            {
                isMatchLoading ? (
                    <>Loading</>
                ) : (
                    isMatch?.length <= 0 ? (
                        null

                    ) : (
                        <div role="alert" className="bg-green-100 gap-3 rounded-md flex p-0 w-[26%] mb-3 mt-3">
                            <FaUserCheck />
                            <span>Your profile match this job</span>
                        </div>
                    )

                )
            }

            <p>Google</p>
            <p>{jobLocation}</p>
            <div className="mt-4">
                <Link to={`/detail/${_id}`}>
                    <button className="btn btn-sm btn-outline btn-primary">Learn More</button>
                </Link>
            </div>
        </div>
    );
};

export default AllJobSearch;

