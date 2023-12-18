import { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from "react-router-dom";
import DOMPurify from 'dompurify';
import useAxiosPublic from '../../../components/Hooks/useAxiosPublic';
import NewReleasesIcon from '@mui/icons-material/NewReleases'; import { AuthContext } from '../../../dashboard/authProvider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../components/Hooks/useAxiosSecure';

const Detail = () => {
    const data = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext)
    const [loggedInUserData, setLoggedInUserData] = useState([])
    const [filterMap, setFilterMap] = useState([])
    const [nonos, setNono] = useState({})
    const { roleName, salary, skill, experience, type, content, location, status, companyName } = data;

    if (status === 'stop') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Recreuter is not accepting any applications",
            footer: `<Link to='alljobs'>Go Back</Link>`
        });
    }
    useEffect(() => {
        let isMounted = true;

        axiosSecure.get('/users')
            .then(res => {
                if (isMounted) {
                    setLoggedInUserData(res.data);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [axiosSecure]);

    useEffect(() => {
        const nono = loggedInUserData?.filter(users => users.emails === user?.email);
        setFilterMap(nono);
    }, [user?.email, loggedInUserData]);

    useEffect(() => {
        if (filterMap) {
            filterMap.map(res => setNono(res));
        }
    }, [filterMap]);


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
        <div className="bg-gray-200 mt-[8rem] w-[70%] m-auto rounded-md p-3 font-sans">
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
                            skill?.map((sk, index) =>
                                <div key={index + 1} className="badge badge-outline">{sk.label}</div>

                            )
                        }
                    </div>
                </div>


                <div>
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
    );
};

export default Detail;
