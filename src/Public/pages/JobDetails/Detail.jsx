import React, { useContext } from 'react';
import { useLoaderData } from "react-router-dom";
import DOMPurify from 'dompurify';
import useAxiosPublic from '../../../components/Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../dashboard/authProvider/AuthProvider';
import Swal from 'sweetalert2';

const Detail = () => {
    const data = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext)
    const { roleName, salary, skill, experience, type, content, location } = data;

    const submitApllication = () => {
        const status = 'pending'
        const dataToInsert = { roleName, experience, skill, email: user?.email, status }
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
    console.log(skill)
    return (
        <div className="bg-gray-200 mt-[8rem] w-[70%] m-auto rounded-md p-3">
            <div className="0">
                <div className='flex justify-between'>
                    <div>
                        <h2 className="text-3xl">{roleName}</h2>
                        <p>{salary} salary</p>
                        <p>{experience} experience</p>
                        <p>{type}</p>
                        <p>{location} location</p>
                    </div>
                    <div>
                        <button onClick={() => document.getElementById('my_modal_3').showModal()} className='btn btn-sm btn-primary btn-outline'>Apply</button>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <div>Skills:</div>
                    <div>
                        {
                            skill?.map(sk =>
                                <div key={sk} className="badge badge-outline">{sk.label}</div>

                            )
                        }
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            </div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box text-center">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">This will redirect you to the company site</h3>
                    <button onClick={submitApllication} className='btn btn-sm btn-success btn-outline mt-6'>Apply</button>
                </div>
            </dialog>
        </div>
    );
};

export default Detail;
