import React, { createContext, useState } from 'react';

export const Authcontext = createContext()
const AuthProvider = ({children}) => {
    const [user,setUser] = useState({name:'Md Mijanur Rahaman', email:'admin@mrlaboratory.com'})
    return (
       <Authcontext.Provider value={user}>
        {children}
       </Authcontext.Provider>
    );
};

export default AuthProvider;