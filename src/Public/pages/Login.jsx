

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import toast from "react-hot-toast";

//import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firbase';
import { AuthContext } from '../../dashboard/authProvider/AuthProvider';
import useAxiosPublic from '../../components/Hooks/useAxiosPublic';
import { Helmet } from 'react-helmet-async';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
    const { googleSignIn, signIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();


    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                toast.error(error.message)
            })
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                console.log(res.user.photoURL)
                const role = "employee";
                const status = "Active";
                const skills = []
                const all = { name: res.user.displayName, emails: res.user.email, image: res.user.photoURL, role, status, skills }
                axiosPublic.post('/users', all)
                    .then(res => {
                        console.log(res.data)
                        navigate("/")
                    })
            })
            .catch(error => console.error(error))
    }

    const defaultTheme = createTheme();


    return (
        <ThemeProvider theme={defaultTheme}>
             <Helmet>
                <title>BD Hunt || Login</title>
            </Helmet>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                    <Button onClick={handleGoogleSignIn}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        <FaGoogle></FaGoogle> <span className="ml-3">Continue with Google</span>

                    </Button>
                </Box>
            </Container>

        </ThemeProvider>
    );
}

export default SignIn;