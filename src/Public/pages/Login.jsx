import GoogleIcon from '@mui/icons-material/Google';
import { useContext } from 'react';
import { AuthContext } from '../../dashboard/authProvider/AuthProvider';
const Login = () => {
    const {googleSignIn} = useContext(AuthContext);
    const handleGoogleLogin = () => {
        googleSignIn()
        .then(res => {
            console.log(res.user)
        })
    }
    return (
        <div className='text-center mt-[20%]'>
            <button onClick={handleGoogleLogin} className="btn">
                <GoogleIcon></GoogleIcon>
                Continue With Google
            </button>
        </div>
    );
};

export default Login;