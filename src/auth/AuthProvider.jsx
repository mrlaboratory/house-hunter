import { useQuery } from '@tanstack/react-query';
import React, { createContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import axios from 'axios';


export const Authcontext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [run, change] = useState(false)
    const [path,setPath] = useState('/dashboard')


    // console.log(`${import.meta.env.VITE_SERVER}`);
    const createUser = () => {

    }
    const loginUser = () => {

    }
    const logoutUser = () => {
        localStorage.removeItem('userToken')
        setUser(null)
        refetch()
    }

    const {data, refetch } = useQuery({
        queryKey : ['userData'], 
        queryFn : async() => {
            const res = await axios(`${import.meta.env.VITE_SERVER}/userData`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
            })
            console.log(res);
            setUser(res.data)
            return res.data
        },
    })

    const getData = async token => {
       const res =  await axios(`${import.meta.env.VITE_SERVER}/userData`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }) .then(d => {
            console.log(d)
        })
        .catch(e => console.log(e))
    }



    // get user data 
    useEffect(() => {
        // const token = localStorage.getItem('userToken')
        // if (token) {
        //     console.log(token);
        //    fetch(`${import.meta.env.VITE_SERVER}/userData`,{
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     }
        //    })
        //    .then(res => res.json())
        //    .then(d => {
        //     setUser(d)
        //    })
        //    .catch(e => console.log(e))
           
        // }else{
        //     change(true)
        // }

    }, [run])

    const info = {
        user,
        refetch,
        change,
        createUser,
        loginUser,
        logoutUser,
        path,
        setPath, 



    }

    return (
        <Authcontext.Provider value={info}>
            {children}
            <Toaster />
        </Authcontext.Provider>
    );
};

export default AuthProvider;