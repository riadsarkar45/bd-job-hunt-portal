import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../Firbase";
import useAxiosPublic from "../../components/Hooks/useAxiosPublic";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const axiousPublic = useAxiosPublic();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider()
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const signIn = (email, password) => {
        setLoading(true);
        console.log('Before sign-in:', email, password);
        return signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log('Sign-in successful:', result.user);
                return result; // This may not be necessary depending on your use case
            })
            .catch(error => {
                console.error('Sign-in error:', error);
                throw error; // Rethrow the error to propagate it to the calling code
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const creatUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserInfo = (name, imgUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: imgUrl
        })
    }
    useEffect(() => {
        const unsubsCribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiousPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false)

                        }
                    })
            } else {
                localStorage.removeItem('access-token')
                setLoading(false)

            }

            setUser(currentUser)

        })
        return () => {
            return unsubsCribe();
        }

    }, [axiousPublic])
    const authInfo = { user, googleSignIn, logOut, signIn, loading, updateUserInfo, creatUser }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;