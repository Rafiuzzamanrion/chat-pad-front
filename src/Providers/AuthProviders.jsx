import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import axios from "axios";







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


            // ======== json web token(jwt) ==========

            //  if user exist issue a token
            if (currentUser && currentUser?.email) {
                const loggedUser = {
                    email: currentUser?.email
                }

                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(loggedUser)
                })
                    .then(res => res.json())
                    .then(data => {

                        localStorage.setItem('token', data.token)
                    })
            }
            else {
                localStorage.removeItem('token')
            }
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