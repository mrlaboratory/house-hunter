import React, { useContext } from 'react';
import { Authcontext } from '../auth/AuthProvider';
import { toast } from 'react-hot-toast';
import { AiFillCloseCircle } from 'react-icons/Ai';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useBookedData from '../hooks/useBookedData';

const HouseCard = ({ name,availabilityDate, pictureUrl,ownerEmail, rent, _id, city, bedrooms, bathrooms, romeSize , setActiveData}) => {
    const { user } = useContext(Authcontext)
   const [axiosSecure] = useAxiosSecure()
   const [bookedHouse, refetch] = useBookedData()

   console.log(bookedHouse);
    const handleMoDalOpen = id => {
        if (user) {
            if (user?.role === 'House Renter') {
                window.my_modal_5.showModal()
                const info = { bookedBy: user.email, name,ownerEmail, houseId: _id, rent, bedrooms,pictureUrl, city }
                setActiveData(info);
            } else {
                toast.error('Only House Renter can book the house !!')
            }
        } else {
            toast.error('Please login first !!')
        }

    }

    const isBooked = bookedHouse?.find((i)=> i.houseId === _id)
    // console.log(isBooked);


    return (
        <div className='p-2 rounded-lg bg-white relative shadow-md group'>
            <div className='w-full overflow-hidden rounded-lg'>
                <img className=' object-cover group-hover:scale-110 duration-500' src={pictureUrl} alt="" />
            </div>
            <div>
                <h2 className='text-xl font-bold  text-primary'> {name}</h2>
                <h3>In - {city}</h3>
                <h3>(Bedrooms - {bedrooms}) (Bathrooms - {bathrooms}) (RoomSize - {romeSize}ft)</h3>
                <h3>Avilable : {availabilityDate}</h3>
            </div>
            <button disabled={isBooked} onClick={() => handleMoDalOpen(_id)} className='w-full btn btn-primary btn-sm mt-2'> {isBooked ? 'Booked' : 'Book'} </button>
            <span className='bg-white p-1 rounded-lg absolute top-0 right-0 text-gray-700 font-bold'>{rent}$</span>


   
        </div>
    );
};

export default HouseCard;