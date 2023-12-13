import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { MultiSelect } from "react-multi-select-component";
import useAxiosSecure from '../../components/Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../authProvider/AuthProvider';
import useAxiosPublic from '../../components/Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyProfile = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selected, setSelected] = useState([]);
    const [users, setUser] = useState([])
    const [filteredUser, setFilterUser] = useState([])
    const [mappedUser, setMappedUser] = useState({})
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const { email } = useParams();
    // distructer mappedUser
    const { skills, _id } = mappedUser;
    const { data: userse = [], refetch } = useQuery({
        queryKey: ['usere'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/usere/${email}`);
            return res.data;
        }
    });
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        axiosSecure.get('/users')
            .then(res => {
                setUser(res.data)
            })
    }, [axiosSecure])

    useEffect(() => {
        const filteredUsers = users?.filter((useer) => useer.emails === user?.email);
        setFilterUser(filteredUsers);
        console.log()
        // map filtered users

        filteredUser?.map(us => setMappedUser(us))
    }, [users]);

    const skillString = skills?.map(sks => sks.label).join(', ')
    const handleUserProfile = (e) => {
        e.preventDefault();
        const skills = selected;
        const dataToInsert = { skills };

        axiosPublic.patch(`/users/${email}`, dataToInsert)
            .then(res => {
                toast.success('Information Saved');
                console.log(res.data);
                Swal.fire({
                    title: "Good job!",
                    text: "Now you can match your job and apply!",
                    icon: "success"
                });
                refetch();
            })
            .catch(error => {
                console.error('Error updating user profile:', error);
            });
    };


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


            <div className='w-full mt-9'>
                <MultiSelect className='w-full'
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labeledBy="Selecterargragrgre"
                />
                <div className='grid grid-cols-2 gap-2 mt-3'>
                    <input readOnly type="email" value={user?.email} placeholder="Type here" className="input input-bordered w-full" />
                    <input readOnly type="skills" value={`Your skills ${skillString}`} placeholder="Type here" className="input input-bordered w-full" />
                </div>
            </div>
            <div className='text-center mt-6'>
                <button onClick={handleUserProfile} className='btn btn-outline'>Submit</button>
            </div>
        </div>


    );
};

export default MyProfile;