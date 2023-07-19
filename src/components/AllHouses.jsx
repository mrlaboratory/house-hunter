import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import HouseCard from './HouseCard';

const AllHouses = () => {
    const [houses, setHouses] = useState(null)
    const [query, setQuery] = useState('')
    const [city, setCity] = useState('')
    const [bedrooms, setBedrooms] = useState(10);

    const { data, refetch } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const res = await axios(`${import.meta.env.VITE_SERVER}/houses?text=${query}&city=${city}`)
            console.log(res.data);
            setHouses(res.data)
            return res.data;

        }
    })
    const handleSeachQuery = e => {
        setQuery(e.target.value)
        refetch()
    }


    const handleBedrooms = (event) => {
        const newValue = event.target.value;
        setBedrooms(newValue);
    };

    return (
        <div className=' p-3 md:p-0'>
            <div className='my-3 bg-white p-5 rounded-lg shadow-md '>
                <div className='w-full md:flex justify-center items-center'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 '>
                        <div className='w-full md:w-[300px]'>
                            <input onChange={handleSeachQuery} type="text" placeholder="Search by name " className="input input-bordered input-primary w-full" />

                        </div>
                        <div className='w-full md:w-[300px]'>
                            <input type="text" placeholder="City" className="input input-bordered input-primary w-full" />
                        </div>
                        <div className='w-full flex items-center'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>


                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
                <div className='p-5 rounded-lg bg-white shadow-md'>
                    <h3 className='my-2'>Filter by Bedrooms</h3>
                    <div className='flex items-center gap-2'>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={bedrooms}
                            className="range range-primary w-full"
                            onChange={handleBedrooms}
                        />
                        <h4>{bedrooms}</h4></div>
                </div>
                <div className='md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
                    {houses && houses.map((item, i) => <HouseCard key={i} {...item} ></HouseCard>)}
                    <div>


                    </div>

                </div>
            </div>
            <div className='w-full bg-white my-2 rounded-lg p-5 shadow-md flex justify-center items-center'>
                <div className="join">
                    <button className="join-item btn btn-md">1</button>
                    <button className="join-item btn btn-md btn-active">2</button>
                    <button className="join-item btn btn-md">3</button>
                    <button className="join-item btn btn-md">4</button>
                </div>
            </div>
        </div>
    );
};

export default AllHouses;