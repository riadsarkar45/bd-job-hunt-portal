import { useContext, useEffect, useState } from 'react';
import { useLoaderData, useParams } from "react-router-dom";
import DOMPurify from 'dompurify';
import useAxiosPublic from '../../../components/Hooks/useAxiosPublic';
import NewReleasesIcon from '@mui/icons-material/NewReleases'; import { AuthContext } from '../../../dashboard/authProvider/AuthProvider';
import Swal from 'sweetalert2';
import SideBarJob from './DetailPageSidebar/SideBarJob';
import { useQuery } from '@tanstack/react-query';

const Detail = () => {
    const { id, email } = useParams();
    const data = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext)
    const [nonos,] = useState({})
    const [sideJobs, setSideJobs] = useState([])
    const [sideJobFilter, setSiteJobFilter] = useState([])
    const [userSkills, setUserSkill] = useState([])
    const [jobSkill, setJobSkill] = useState([])
    const [isMatch, setIsMatch] = useState('')
    const [isNotMatch, setIsNotMatch] = useState([])
    const { roleName, salary, skill, experience, type, content, location, status, companyName } = data;
    const { data: userSkill = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/usere/${email}`);
            return res.data;
        }
    });

    const { skills } = userSkill;

    useEffect(() => {
        setUserSkill(
            skills?.map(sk => sk.label)
        )
        setJobSkill(
            skill?.map(jobSk => jobSk.label)
        )
    }, [skills, skill])
    useEffect(() => {
        const skill1 = userSkills
        const skill2 = jobSkill;
        const matchedSkill = skill1?.filter((sk) => skill2?.includes(sk))
        const notMatchedSkill = skill2?.filter((sk) => !skill1?.includes(sk))
        console.log(notMatchedSkill)
        setIsNotMatch(notMatchedSkill)
        setIsMatch(matchedSkill)


        //console.log(filt)
    }, [userSkills, jobSkill])
    

    if (status === 'stop') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Recreuter is not accepting any applications",
            footer: `<Link to='alljobs'>Go Back</Link>`
        });
    }

    useEffect(() => {
        axiosPublic.get('/jobs')
            .then(res => {
                setSideJobs(res.data)
            });
        window.scrollTo(0, 0);

    }, [axiosPublic]);

    useEffect(() => {
        const filter = sideJobs?.filter((jobs) => jobs?._id !== id)
        setSiteJobFilter(filter)

    }, [sideJobs, id])

    const submitApllication = () => {

        const { resume } = nonos
        console.log(resume)
        const status = 'pending'
        const dataToInsert = { roleName, experience, skill, email: user?.email, status, resume }
        axiosPublic.post('/application', dataToInsert)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    title: "Good job!",
                    text: "You clicked the button!",
                    icon: "success"
                });
            })


    }




    const sanitizedContent = DOMPurify.sanitize(content);
    return (
        <div className='flex mt-[8rem] w-[85%] m-auto gap-5 font-serif'>
            <div className="shadow-lg rounded-md w-[70%] p-3 font-sans">
                <div className="0">
                    <div className='flex justify-between'>
                        <div>
                            <h2 className="text-3xl">{roleName}</h2>
                            <p>
                                {companyName}
                            </p>
                            <div>
                                {
                                    status === 'start' ? (
                                        <p>Actively recruiting</p>
                                    ) : (
                                        null
                                    )
                                }
                            </div>
                            <p>{salary} salary</p>
                            <p>{experience} experience</p>
                            <p>{type}</p>
                            <p>{location} location</p>
                        </div>
                        <div>
                            {
                                status === 'stop' ? (
                                    <button disabled onClick={() => document.getElementById('my_modal_3').showModal()} className='btn btn-sm btn-primary btn-outline'>Apply</button>
                                ) : (
                                    <button onClick={() => document.getElementById('my_modal_3').showModal()} className='btn btn-sm btn-primary btn-outline'>Apply</button>
                                )
                            }
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div>Skills:</div>
                        <div>
                            {
                                isLoading ? (
                                    <p>Loadding...</p>
                                ) : (

                                    skill?.map((sk, index) =>
                                        <div key={index + 1} className="badge badge-outline">{sk.label} </div>

                                    )

                                )
                            }
                        </div>

                    </div>
                    {
                        isNotMatch.length <= 0 ? (
                            null
                        ) : (
                            <div className='flex gap-2 mt-2'>
                                <div>Your missing skills:</div>
                                <div>
                                    {
                                        isLoading ? (
                                            <p>Loading...</p>
                                        ) : (
                                            isNotMatch?.map((sk, index) =>
                                                <div key={index + 1} className="badge badge-outline">{sk}</div>
                                            )
                                        )
                                    }
                                </div>

                            </div>
                        )
                    }



                    <div className='mt-8'>
                        {
                            status === 'stop' ? (
                                <div className='text-center mt-8 bg-red-500 rounded-lg bg-opacity-30'>
                                    <p className='text-4xl'>
                                        <NewReleasesIcon className=' text-[11rem] text-red-500' />
                                    </p>
                                    <p className=" text-white p-5 text-3xl">No longer accepting applications for this role</p>
                                </div>
                            ) : (
                                <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                            )
                        }
                    </div>
                </div>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box text-center">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Are you sure?</h3>

                        <button onClick={submitApllication} className='btn btn-sm btn-success btn-outline mt-6'>Apply</button>
                    </div>
                </dialog>
            </div>
            <div className='shadow-lg w-[30%]'>
                <h2 className='text-2xl p-2'>Jobs you may like</h2>
                {
                    sideJobFilter?.map(jobs => <SideBarJob key={jobs._id} jobs={jobs}></SideBarJob>)
                }
            </div>
        </div>
    );
};

export default Detail;
