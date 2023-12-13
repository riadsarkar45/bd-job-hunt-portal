import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from "firebase/auth";
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
    const authInfo = { user, googleSignIn, logOut, loading, updateUserInfo, creatUser }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;