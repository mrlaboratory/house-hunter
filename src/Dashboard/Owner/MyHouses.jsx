import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from '../../auth/AuthProvider';

const MyHouses = () => {
    const [houses, setHouses] = useState()
    const { user } = useContext(Authcontext)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER}/housesByEmail/${user?.email}`)
            .then(res => res.json())
            .then(d => {
                setHouses(d)
            })
            .catch(e => console.log(e))

    }, [user])

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-xs md:table-lg">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Adress</th>
                            <th>Bedrooms</th>
                            <th>Rent</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            houses && houses.map((item, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.city}</td>
                                <td>{item.bedrooms}</td>
                                <td>{item.rent}</td>
                                <td className=''>
                                    <div className='flex gap-1'>
                                        <button className='btn btn-sm btn-primary  text-white'>Edit</button>
                                        <button className='btn btn-sm bg-red-500 text-white'>Delete</button>
                                    </div>
                                </td>
                            </tr>)
                        }
                        {
                            houses && houses.map((item, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.city}</td>
                                <td>{item.bedrooms}</td>
                                <td>{item.rent}</td>
                                <td className=''>
                                    <div className='flex gap-1'>
                                        <button className='btn btn-sm btn-primary  text-white'>Edit</button>
                                        <button className='btn btn-sm bg-red-500 text-white'>Delete</button>
                                    </div>
                                </td>

                            </tr>)
                        }



                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyHouses;