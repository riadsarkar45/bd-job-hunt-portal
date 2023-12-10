import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../Firbase";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider ()
    const googleSignIn = () =>{
        setLoading(true)
        return signInWithPopup(auth, provider);
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubsCribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setLoading(false)
            setUser(currentUser)

        })
        return () => {
            return unsubsCribe();
        }

    }, [])
    const authInfo = { user, googleSignIn, logOut, loading }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;