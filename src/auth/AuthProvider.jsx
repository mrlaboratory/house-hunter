import { useQuery } from '@tanstack/react-query';
import React, { createContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import axios from 'axios';


export const Authcontext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [run, change] = useState(false)
    const [path, setPath] = useState('/dashboard')
    const [loading, setLoading] = useState(true)


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

    const { data, refetch } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            try {
                const res = await axios(`${import.meta.env.VITE_SERVER}/userData`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                    },
                });
                setUser(res.data);
                return res.data;
            } catch (error) {
                // Handle error the data cannot be loaded
                console.error(error);
                setLoading(false);
                return null;
            }
        },
    });

    const getData = async token => {
        const res = await axios(`${import.meta.env.VITE_SERVER}/userData`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(d => {
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
        loading,



    }

    return (
        <Authcontext.Provider value={info}>
            {children}
            <Toaster />
        </Authcontext.Provider>
    );
};

export default AuthProvider;