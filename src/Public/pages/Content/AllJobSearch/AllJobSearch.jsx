import { useContext, useEffect } from "react";
import useAxiosSecure from "../../../../../src/components/Hooks/useAxiosSecure"
import { useState } from "react";
import { AuthContext } from '../../../../dashboard/authProvider/AuthProvider';

const AllJobSearch = ({ data }) => {
    const { type, salary, jobLocation, cont, skill, roleName } = data;
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext)
    const [loggedInUser, setLoggedInUser] = useState([])
    const [mappedUser, setMappedUser] = useState({})
    const [filterUser, setFilterUser] = useState([])
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
        // Use the updated state directly


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
                        <>ddd</>

                    ) : (
                        <div role="alert" className="bg-green-100 gap-3 rounded-md flex p-1 w-[31%]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Your profile match this job</span>
                        </div>
                    )

                )
            }

            <p>Google</p>
            <p>{jobLocation}</p>

        </div>
    );
};

export default AllJobSearch;

