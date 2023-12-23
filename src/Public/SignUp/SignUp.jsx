import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import { AuthContext } from '../../dashboard/authProvider/AuthProvider';
import useAxiosPublic from '../../components/Hooks/useAxiosPublic';
import { Helmet } from 'react-helmet-async';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {

    const { updateUserInfo, creatUser } = useContext(AuthContext);
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    console.log(image_hosting_api, image_hosting_key)
    const axiousPublic = useAxiosPublic()
    const handleSignUp = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log();
        const dataToInsert = {
            emails: formData.get('email'),
            password: formData.get('password'),
            fullName: formData.get('fullName'),
            role: formData.get('role'),
        }
        console.log(dataToInsert)
        const res = await axiousPublic.post(image_hosting_api, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        const imgUrl = res.data.data.display_url;
        console.log(imgUrl)
        if (res.data.success) {
            console.log(dataToInsert.emails)
            creatUser(dataToInsert.emails, dataToInsert.password)
                .then(res => {
                    console.log(res.user)
                    axiousPublic.post('/users', dataToInsert)
                        .then(res => {
                            console.log(res.data)
                            updateUserInfo(dataToInsert.name, imgUrl)
                                .then((res) => {
                                    console.log(res.data)
                                })
                                .catch(error => console.error(error))
                        })

                })
                .catch(error => console.error(error))
        }
    }


    return (
        <ThemeProvider theme={defaultTheme}>
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="fullName"
                                    required
                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <input type="file" name='image' className="file-input file-input-bordered w-full" />
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <select name='role' className="select select-bordered w-full">
                                        <option disabled selected>Why are you here?</option>
                                        <option value="hiring">Hiring</option>
                                        <option value="employee">Looking For Job</option>
                                    </select>
                                </div>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}