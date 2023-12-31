import React from 'react';
import useBookedData from '../../hooks/useBookedData';
import { toast } from 'react-hot-toast';

const MyBookings = () => {
    const [bookedHouse, refetch] = useBookedData()
    console.log(bookedHouse);
    const handleRemoveBooking = id => {
        fetch(`${import.meta.env.VITE_SERVER}/removebooking/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(d => {
                if (d?.deletedCount) {
                    toast.success('House deleted from booking list !!')

                }
                console.log(d);
                refetch()
            })
            .then(e => {
                toast.error(e.message)
                console.log(e)
                refetch()


            })

    }


    return (
        <div>
            <div className='md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>

                {
                    bookedHouse && bookedHouse.map((item, i) => <div key={i} className='p-2 rounded-lg bg-white relative shadow-md group'>
                        <div className='w-full overflow-hidden rounded-lg'>
                            <img className=' object-cover group-hover:scale-110 duration-500' src={item?.pictureUrl} alt="" />
                        </div>
                        <div>
                            <h2 className='text-xl'> {item?.name}</h2>
                            <h3>In - {item?.city}</h3>

                        </div>
                        <button onClick={() => handleRemoveBooking(item?._id)} className='w-full btn bg-red-600 text-white btn-sm mt-2'>Remove from Booking List</button>
                        <span className='bg-white p-1 rounded-lg absolute top-0 right-0 text-gray-700 font-bold'>{item?.rent}$</span>


                    </div>)
                }

                {
                    bookedHouse?.length === 0 && <h2 className='text-2xl font-bold'>There is no booking house </h2> 

                }


            </div>
        </div >
    );
};

export default MyBookings;