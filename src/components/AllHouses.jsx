import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import HouseCard from './HouseCard';
import { Authcontext } from '../auth/AuthProvider';
import { AiFillCloseCircle } from 'react-icons/Ai';
import { toast } from 'react-hot-toast';


const AllHouses = () => {
    const { user } = useContext(Authcontext)
    const [activeData, setActiveData] = useState('')
    const { data: totalHouses } = useQuery({
        queryKey: ['houses'],
        queryFn: async () => {
            const res = await axios(`${import.meta.env.VITE_SERVER}/totalhouses`)
            console.log(res?.data?.totalHouses);
            return res?.data?.totalHouses;

        }
    })
    const [activePage, setActivePage] = useState(0)
    const limit = 2
    const pages = Math.ceil(totalHouses / limit)
    let totalPages = pages ? [...Array(pages).keys()] : []
    console.log(totalHouses);

    const { data: data2, refetch: loadHouse } = useQuery({
        queryKey: [activePage],
        queryFn: async () => {
            const res = await axios(`${import.meta.env.VITE_SERVER}/allhouse?page=${activePage}&limit=${limit}`)
            setHouses(res.data)
            return res?.data

        }
    })



    const [houses, setHouses] = useState(null)
    const [query, setQuery] = useState('')
    const queryRef = useRef('')
    const bedroomsRef = useRef('')
    const bathroomsRef = useRef('')
    const rentRef = useRef('')
    const sizeRef = useRef('')
    const cityRef = useRef('')

    const [city, setCity] = useState('')
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [rent, setRent] = useState(0);
    const [size, setSize] = useState(0);



    const { data, refetch } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const res = await axios(`${import.meta.env.VITE_SERVER}/houses?text=${queryRef.current.value}&city=${cityRef.current.value}&rent=${rentRef.current.value}&bedrooms=${bedroomsRef.current.value}&bathrooms=${bathroomsRef.current.value}&size=${sizeRef.current.value}`)
            console.log(res.data);
            setHouses(res.data)
            return res.data;

        }
    })
    const handleSeachQuery = e => {
        setQuery(queryRef.current.value)
        console.log(queryRef.current.value);
        refetch()
    }
    const handleCity = e => {
        setCity(queryRef.current.value)
        console.log(cityRef.current.value);
        refetch()
    }


    const handleBedrooms = (event) => {
        const newValue = event.target.value;
        setBedrooms(bedroomsRef.current.value);
        refetch()
    };

    const handleBathrooms = (event) => {
        const newValue = event.target.value;
        setBathrooms(bathroomsRef.current.value);
        refetch()
    };
    const handleRent = (event) => {
        const newValue = event.target.value;
        setRent(rentRef.current.value);
        refetch()
    };
    const handleSize = (event) => {
        const newValue = event.target.value;
        setSize(sizeRef.current.value);
        refetch()
    };

    const handleClose = () => {
        window.my_modal_5.close()
    }


    const handleBook = e => {
        e.preventDefault()
        const info = {...activeData}
        info.renterNumber = e.target .number.value 
        fetch(`${import.meta.env.VITE_SERVER}/bookinghouse`, {
            method: "POST",
            headers: {
                'content-type':'application/json',
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
            body:JSON.stringify(info)
        })
            .then(res => res.json())
            .then(d => {
                if (d.insertedId) {
                    toast.success('House booked successfully !!')
                    window.my_modal_5.close()
                    refetch()
                }
                if(d?.error){
                    toast.error(d.message)
                    window.my_modal_5.close()
                    refetch()
                }
            })
            .catch(e => {
                toast.error(e.message)
                console.log(e)
                window.my_modal_5.close()
            })
    

    }
    return (
        <div className=' p-3 md:p-0'>
            <div className='my-3 bg-white p-5 rounded-lg shadow-md '>
                <div className='w-full md:flex justify-center items-center'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 '>
                        <div className='w-full md:w-[300px]'>
                            <input ref={queryRef} onChange={handleSeachQuery} type="text" placeholder="Search by name " className="input input-bordered input-primary w-full" />

                        </div>
                        <div className='w-full md:w-[300px]'>
                            <input ref={cityRef} onChange={handleCity} type="text" placeholder="City" className="input input-bordered input-primary w-full" />
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
                    <h3 className='my-2'>Filter by Monthly Rent</h3>
                    <div className='flex items-center gap-2'>
                        <input
                            type="range"
                            min={0}
                            max={10000}
                            value={rent}
                            ref={rentRef}
                            className="range range-primary w-full"
                            onChange={handleRent}
                        />
                        <h4>{rent}</h4></div>
                    <h3 className='my-2'>Filter by Bedrooms</h3>
                    <div className='flex items-center gap-2'>
                        <input
                            type="range"
                            min={0}
                            max={10}
                            ref={bedroomsRef}
                            value={bedrooms}
                            className="range range-primary w-full"
                            onChange={handleBedrooms}
                        />
                        <h4>{bedrooms}</h4></div>


                    <h3 className='my-2'>Filter by Bathrooms</h3>
                    <div className='flex items-center gap-2'>
                        <input
                            type="range"
                            min={0}
                            max={10}
                            ref={bathroomsRef}
                            value={bathrooms}
                            className="range range-primary w-full"
                            onChange={handleBathrooms}
                        />
                        <h4>{bathrooms}</h4></div>
                    <h3 className='my-2'>Filter by Room Size</h3>
                    <div className='flex items-center gap-2'>
                        <input
                            type="range"
                            min={0}
                            max={50}
                            ref={sizeRef}
                            value={size}
                            className="range range-primary w-full"
                            onChange={handleSize}
                        />
                        <h4>{size}ft</h4></div>
                </div>
                <div className='md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
                    {houses && houses.map((item, i) => <HouseCard key={i} {...item} setActiveData={setActiveData} ></HouseCard>)}
                    <div>


                    </div>

                </div>
            </div>
            <div className='w-full bg-white my-2 rounded-lg p-5 shadow-md flex justify-center items-center'>

                <div className="btn-group">
                    {
                        totalPages?.map(i => <button onClick={() => setActivePage(i)} key={i} className={`btn border-none text-white bg-[#95b3e0] btn-md ${activePage == i ? 'btn-active text-white' : ''}`}>{i + 1}</button>)
                    }

                </div>

            </div>



            <dialog id="my_modal_5" className="modal ">
                <div method="dialog" className="modal-box">

                    <form onSubmit={handleBook}>
                        <input name='name' value={user.name} required type="text" placeholder="Name " className="input input-bordered input-primary w-full my-2 bg-gray-100 border-0 " />
                        <input name='email' value={user.email} required type="email" placeholder="Email " className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                        <input name='number' required type="text" placeholder="number  " className="input input-bordered input-primary my-2 w-full bg-gray-100 border-0 " />

                        <button className='btn btn-primary w-full my-3'>Book Now</button>
                    </form>
                    <button className='absolute top-0 right-0 rounded-full bg-red-600 text-white m-3' onClick={handleClose}> <AiFillCloseCircle className='text-3xl font-bold'></AiFillCloseCircle> </button>
                </div>


            </dialog>
        </div>
    );
};

export default AllHouses;