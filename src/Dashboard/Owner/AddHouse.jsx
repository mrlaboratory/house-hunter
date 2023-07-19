import React, { useContext, useState } from 'react';
import { Authcontext } from '../../auth/AuthProvider';
import { AiOutlineLoading3Quarters } from 'react-icons/Ai';
import { toast } from 'react-hot-toast';

const AddHouse = () => {
    const { user } = useContext(Authcontext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')


    var bdPhoneNumberPattern = /^(\+?880|0)1[13456789]\d{8}$/;
    // Function to validate the phone number
    function validatePhoneNumber(phoneNumber) {
        return bdPhoneNumberPattern.test(phoneNumber);
    }


    const handleAddHouse = e => {
        e.preventDefault()
        setLoading(true)
        const form = e.target
        const name = form.name.value
        const address = form.address.value
        const city = form.city.value
        const bedrooms = parseInt(form.bedrooms.value)
        const bathrooms = parseInt(form.bathrooms.value)
        const romeSize = parseInt(form.romesize.value)
        const pictureUrl = form.picture.value
        const availabilityDate = form.availabilitydate.value
        const rent = parseInt(form.rent.value)
        const number = form.number.value
        const description = form.description.value
        const info = { name, address, city, ownerEmail: user.email, ownerName: user.name, bedrooms, bathrooms, romeSize, pictureUrl, availabilityDate, rent, number, description }
        if(!validatePhoneNumber(number)){
            toast.error('Please use bangladeshi phone number ')
            setLoading(false)
            return
        }
        fetch(`${import.meta.env.VITE_SERVER}/addnewhouse`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(d => {
                console.log(d)
                toast.success('Room added successfully !!')
                setLoading(false)
                form.reset()

            })
            .catch(e => {
                setLoading(false)
                console.log(e)
                setError(e.message)
            })


    }

    return (
        <div className='p-5'>
            <h2 className='text-center text-2xl font-bold text-gray-700'>Add new house page </h2>

            <div className='p-5 bg-white rounded-lg my-5'>
                <form onSubmit={handleAddHouse}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 my-2 '>
                        <input name='name' required type="text" placeholder="Name " className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                        <input name='address' required type="text" placeholder="Address " className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 my-2'>
                        <input name='city' required type="text" placeholder="City " className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                        <input name='bedrooms' required type="number" placeholder="Bedrooms " className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 my-2'>
                        <input name='bathrooms' required type="number" placeholder="Bathrooms" className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                        <input name='romesize' required type="text" placeholder="Room Size (ft)" className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 my-2'>
                        <input name='picture' required type="url" placeholder="Picture url" className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                        <input name='availabilitydate' required type="date" placeholder="Availability date " className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 my-2'>
                        <input name='rent' required type="number" placeholder="Rent per month $" className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                        <input name='number' required type="number" pattern="01[3-9]\d{8}"
                            title="Please enter a valid Bangladeshi phone number starting with '01' followed by 10 digits."
                            placeholder="Phone number // 018" className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                    </div>

                    <div className=' my-2'>
                        <textarea required name="description" id="" cols="30" rows="10" className='h-[100px] input input-bordered input-primary w-full bg-gray-100 border-0 p-5' placeholder='Description ...'></textarea>
                    </div>
                    {error && <h3 className='font-bold text-red-600 my-2'>{error}</h3>}
                    <button className='btn btn-primary text-white w-full'>{loading ? <AiOutlineLoading3Quarters className='text-2xl font-bold animate-spin'></AiOutlineLoading3Quarters> : 'Add house'}</button>
                </form>


            </div>
        </div>
    );
};

export default AddHouse;