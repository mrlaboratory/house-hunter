import React from 'react';
import useBookedData from '../../hooks/useBookedData';

const MyBookings = () => {
    const [bookedHouse, refetch] = useBookedData()
    console.log(bookedHouse);
    const handleRemoveBooking = id => {

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
                        <button onClick={() => handleRemoveBooking(item?._id)} className='w-full btn bg-red-600 text-white btn-sm mt-2'>Remove Booking</button>
                        <span className='bg-white p-1 rounded-lg absolute top-0 right-0 text-gray-700 font-bold'>{item?.rent}$</span>


                    </div>)
                }


            </div>
        </div >
    );
};

export default MyBookings;