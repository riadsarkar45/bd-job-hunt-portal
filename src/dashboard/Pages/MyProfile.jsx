import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useState } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { MultiSelect } from "react-multi-select-component";
import useAxiosSecure from '../../components/Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../authProvider/AuthProvider';

const MyProfile = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selected, setSelected] = useState([]);
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };
    const handleUserProfile = (e) => {
        e.preventDefault();
        const email = user?.email;
        const skills = selected;
        const dataToInsert = {email, skills}
        axiosSecure.post('/userProfile', dataToInsert)
        .then(res => {
            toast.success('Information Saved')
        })
    }
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    // modal style

    const options = [
        { label: "React.js", value: "React.js" },
        { label: "Node.js", value: "Node.js" },
        { label: "Python", value: "Python" },
        { label: "Django", value: "Django" },
        { label: "Php", value: "Php" },
    ];
    return (
        <div>
            <div className="md:flex  lg:flex justify-center items-center">
                <div className="bg-gray-100 w-full h-[15rem] rounded-sm">
                    {selectedImage ? (
                        <div className='md:flex lg:flex items-center justify-center h-full'>
                            <img src={selectedImage} alt="Selected" className="w-full h-[17rem] rounded-sm" />
                        </div>
                    ) : (
                        <div className='md:flex lg:flex items-center justify-center h-full'>
                            <label htmlFor="fileInput" className="cursor-pointer">
                                <Button component="div" variant="contained" startIcon={<CameraAltIcon></CameraAltIcon>}>
                                    Cover Photo
                                </Button>
                            </label>
                            <VisuallyHiddenInput
                                id="fileInput"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </div>
                    )}
                </div>
            </div>


            <form onSubmit={handleUserProfile}>
                <div className='w-full mt-9'>
                    <MultiSelect className='w-full'
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Selecterargragrgre"
                    />
                </div>
                <div>
                    {user?.email}
                </div>
                <div>
                    <button className='btn btn-outline'>Submit</button>
                </div>
            </form>
        </div>


    );
};

export default MyProfile;