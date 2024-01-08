import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import JoditEditor from 'jodit-react';
import { useContext, useEffect, useRef, useState } from 'react';
import useAxiosSecure from '../../components/Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { MultiSelect } from "react-multi-select-component";
import Swal from 'sweetalert2';
import { AuthContext } from '../authProvider/AuthProvider';
import { Helmet } from 'react-helmet-async';
import CloseIcon from '@mui/icons-material/Close';
const AddNewJob = () => {
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(null);
    const [selected, setSelected] = useState([]);
    const [filt, setFilt] = useState([])
    const [test, setTest] = useState([])
    const { user } = useContext(AuthContext)
    const editor = useRef(null);
    const axiosSecure = useAxiosSecure();
    const handledAddNewJob = e => {
        e.preventDefault();
        setLoading(true)
        const form = e.target;
        const roleName = form.roleName.value;
        const vacancys = form.vacancys.value;
        const type = form.jobType.value;
        const salary = form.salary.value;
        const experience = form.experience.value;
        const jobLocation = form.jobLocation.value;
        const companyName = form.companyName.value;
        const companySite = form.companySite.value;
        const skill = selected
        const dataToInsert = { roleName, vacancys, type, salary, experience, jobLocation, content, skill: skill, companyName, companySite, email: user?.email }

        axiosSecure.post('/newJob', dataToInsert)
            .then(data => {
                setLoading(false)
                toast.success("Job Posted Successfully")
                console.log(data.data)
                Swal.fire({
                    title: "Job Posted",
                    icon: "success"
                });
            })
    }
    const options = [
        { label: "React.js", value: "React.js" },
        { label: "Node.js", value: "Node.js" },
        { label: "Python", value: "Python" },
        { label: "Django", value: "Django" },
        { label: "Php", value: "Php" },
    ];

    const removeSkills = (skills) => {
        
        const filt = test?.filter(sk => sk !== skills)
        setTest(filt)
        
    }

    const addSkillToArray = (non, sk) => {
        setSelected(allSelectedSkills => [...allSelectedSkills, sk]);
        const filter = test?.filter((tes) => tes.test !== non)
        setFilt(filter)
        setTest(selectedSkills => [...selectedSkills, non]);
    }


    return (
        <div>
            <Helmet>
                <title>Add new job</title>
            </Helmet>
            <form onSubmit={handledAddNewJob}>
                <div className='grid lg:grid-cols-2 md:grid-cols-2 w-full gap-3'>
                    <input className="input input-bordered w-full" name='roleName' placeholder='Role Name' id="outlined-basic" label="Role" />
                    <input className="input input-bordered w-full"  name='vacancys' id="outlined-basic" label="Vancancys" />
                    
                        <select className="select select-bordered w-full"
                            label="jobLocation"
                            name='jobType'
                            id='jobLocation'

                        >
                            <option value='Remote'>Job Location</option>
                            <option value='Remote'>Remote</option>
                            <option value='On Site'>On Site</option>
                        </select>
                    <TextField id="outlined-basic" name="salary" label="Salary" variant="outlined" />
                    <TextField name="experience" id="outlined-basic" label="Experience" variant="outlined" />
                    <TextField name="companyName" id="outlined-basic" label="Company Name" variant="outlined" />


                </div>
                <input className="input input-bordered w-full mt-4" name='companySite' placeholder='Company Site Link' id="outlined-basic" label="Role" />

                <div className="dropdown dropdown-top w-full bg-blue-200 bg-opacity-25 mt-3 p-3 rounded-md">
                    <div tabIndex={0} role="button" className="m-1 w-full flex gap-5">
                        {
                            test.length <= 0 ? (
                                <div>Select Skills</div>
                            ) : (
                                test?.map((test, index) =>
                                    <div className='' key={index}>
                                        <li className='list-none btn shadow-md' >
                                            {test}
                                            <a onClick={() => removeSkills(test)} className='bg-red-500 bg-opacity-25 rounded-md'><CloseIcon /></a>
                                        </li>
                                    </div>
                                )
                            )
                        }
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[52rem]">
                        
                        {
                            
                                options?.map((sks, index) => <li key={index} onClick={() => addSkillToArray(sks.label, sks)}><a>{sks.label}</a></li>)

                            
                        }
                    </ul>
                </div>
                <div className='mt-5'>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        onChange={newContent => setContent(newContent)}
                    />

                </div>
                <div className='text-center mt-4 w-full'>
                    {
                        loading ? (
                            <>
                                <button className='btn btn-outline btn-primary' type='submit'><span className="loading loading-bars loading-lg"></span></button>
                            </>
                        ) : (
                            <><button className='btn btn-outline btn-primary' type='submit'>Submit</button></>
                        )
                    }
                </div>
            </form >

        </div >
    );
};

export default AddNewJob;