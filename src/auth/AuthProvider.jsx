import React, { createContext, useEffect, useState } from 'react';

export const Authcontext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ name: 'Md Mijanur Rahaman', email: 'admin@mrlaboratory.com' })


    console.log(`${import.meta.env.VITE_SERVER}`);
    const createUser = () => {

    }
    const loginUser = () => {

    }
    const logoutUser = () => {
        setUser('')

    }

    useEffect(()=> {

    },[])


    const info = {
        user,
        createUser,
        loginUser,
        logoutUser,


    }

    return (
        <Authcontext.Provider value={info}>
            {children}
        </Authcontext.Provider>
    );
};

export default AuthProvider;