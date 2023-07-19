import React, { useContext } from 'react';
import { Authcontext } from '../auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useBookedData = () => {
    const { user } = useContext(Authcontext)
    const { data:bookedHouse, refetch } = useQuery({
        queryKey: ['booked',user?.eamil],
        queryFn: async () => {
            const res = await axios(`${import.meta.env.VITE_SERVER}/bookedByUser/${user?.email}`)
            return res?.data
        }
    })

    return [bookedHouse,refetch ]
};
export default useBookedData;