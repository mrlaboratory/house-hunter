import React, { useContext, useState } from 'react';
import { Authcontext } from '../../auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageHouses = () => {
    const [axiosSecure] = useAxiosSecure()
    const { user } = useContext(Authcontext)
    const { data: bookedHouses, refetch } = useQuery({
        queryKey: ['houses', user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`${import.meta.env.VITE_SERVER}/bookedByOwner/${user?.email}`)
            console.log(res?.data);
            return res?.data

        }
    })


    return (
        <div>
            <h2 className='text-xl font-bold text-center'>My House Booked </h2>
            <div className=''>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Booked by</th>
                                <th>Location</th>
                                <th>Rent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookedHouses && bookedHouses?.map((item, i) => <tr key={i}>
                                    <th>1</th>
                                    <td>{item?.name}</td>
                                    <td>{item?.bookedBy}</td>
                                    <td>{item?.city}</td>
                                    <td>{item?.rent}$</td>
                                </tr>)
                            }

                        </tbody>
                        <tfoot className='border-t-2 border-gray-600 text-sm font-bold '>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th className='font-bold'>Total</th>
                                <th>{bookedHouses?.reduce((a,c) => a+c.rent,0)}$</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageHouses;