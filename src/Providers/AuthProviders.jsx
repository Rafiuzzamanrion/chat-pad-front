import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";







export const AuthContext = createContext(null)
const auth = getAuth(app);

const AuthProviders = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const handleCreateUser = (email, password) => {
        setLoading();
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = name => {
        setLoading();
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    };

    const handleLoginUser = (email, password) => {
        setLoading();
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOutUser = () => {
        setLoading();
        return signOut(auth);
    }

    const authInfo = {
        user,
        loading,
        handleCreateUser,
        handleLoginUser,
        updateUserProfile,
        logOutUser,
    }

    // ========== user observer =================
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            return unsubscribe;
        };
    }, []);


    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProviders;