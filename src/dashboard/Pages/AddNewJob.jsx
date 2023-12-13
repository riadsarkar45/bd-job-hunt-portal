import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import useAxiosSecure from '../../components/Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { MultiSelect } from "react-multi-select-component";
import Swal from 'sweetalert2';
const AddNewJob = () => {
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(null);
    const [selected, setSelected] = useState([]);
    const editor = useRef(null);
    const axiosSecure = useAxiosSecure();
    const handledAddNewJob = e => {
        e.preventDefault();
        setLoading(true)
        const form = e.target;
        const roleName = form.roleName.value;
        const vacancys = form.vacancys.value;
        const type = form.type.value;
        const salary = form.salary.value;
        const experience = form.experience.value;
        const jobLocation = form.jobLocation.value;
        const companyName = form.companyName.value;
        const skill = selected?.map(slc => slc)
        const dataToInsert = { roleName, vacancys, type, salary, experience, jobLocation, content, skill: skill, companyName }

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
    return (
        <Box
        >
            <form onSubmit={handledAddNewJob}>
                <div className='grid lg:grid-cols-2 md:grid-cols-2 w-full gap-3'>
                    <TextField name='roleName' id="outlined-basic" label="Role" variant="outlined" />
                    <TextField name='vacancys' id="outlined-basic" label="Vancancys" variant="outlined" />
                    <FormControl>
                        <InputLabel htmlFor="jobType">Select Job Location</InputLabel>
                        <Select
                            label="jobLocation"
                            inputProps={{
                                name: 'jobType',
                                id: 'jobLocation',
                            }}
                        >
                            <MenuItem value='Remote'>Remote</MenuItem>
                            <MenuItem value='On Site'>On Site</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField id="outlined-basic" name="salary" label="Salary" variant="outlined" />
                    <TextField name="experience" id="outlined-basic" label="Experience" variant="outlined" />
                    <TextField name="companyName" id="outlined-basic" label="Company Name" variant="outlined" />
                    
                    <FormControl>
                        <InputLabel htmlFor="jobType">Select Job Type</InputLabel>
                        <Select
                            label="type"
                            inputProps={{
                                name: 'type',
                                id: 'type',
                            }}
                        >
                            <MenuItem value='Full Time'>Full Time</MenuItem>
                            <MenuItem value='Part Time'>Part Time</MenuItem>
                        </Select>
                    </FormControl>

                    <div className='w-full'>
                        <MultiSelect className='w-full'
                            options={options}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Selecterargragrgre"
                        />
                    </div>
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
            </form>
        </Box>
    );
};

export default AddNewJob;