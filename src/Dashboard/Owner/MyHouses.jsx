import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from '../../auth/AuthProvider';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { AiFillCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/Ai';

const MyHouses = () => {
    const [houses, setHouses] = useState(null)
    const { user } = useContext(Authcontext)
    const [current, setCurrent] = useState('')
    const { data, refetch } = useQuery({
        queryKey: ['userData', user?.email],
        queryFn: async () => {
            const res = await axios(`${import.meta.env.VITE_SERVER}/housesByEmail/${user?.email}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
            })
            // console.log(res.data);
            setHouses(res.data)
            return res.data;

        }
    })

    const handleDealete = id => {
        console.log(id);
        fetch(`${import.meta.env.VITE_SERVER}/housedelete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
        })
            .then(res => res.json())
            .then(d => {
                if (d.deletedCount) {
                    toast.success('House deleted successfully !!')
                    refetch()
                }
            })
            .catch(e => {
                console.log(e)
            })

    }

    const handleEdit = id => {
        const finded = houses.find(i => i._id === id )
        setCurrent(finded)
        window.editModal.showModal()

    }


    // for update house 
    const handleUpdateHouse = e => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const address = form.address.value
        const city = form.city.value
        const bedrooms = form.bedrooms.value
        const bathrooms = form.bathrooms.value
        const romeSize = form.romesize.value
        const pictureUrl = form.picture.value
        const availabilityDate = form.availabilitydate.value
        const rent = form.rent.value
        const number = form.number.value
        const description = form.description.value
        const info = { name, address, city, bedrooms, bathrooms, romeSize, pictureUrl, availabilityDate, rent, number, description }
        fetch(`${import.meta.env.VITE_SERVER}/houseupdate/${current._id}`, {
            method: "PATCH",
            headers: {
                'content-type':'application/json',
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
            body:JSON.stringify(info)
        })
            .then(res => res.json())
            .then(d => {
                console.log(d);
                if (d.modifiedCount) {
                    toast.success('House updated successfully !!')
                    refetch()
                }
            })
            .catch(e => {
                console.log(e)
            })
        



        window.editModal.close()
        
    }


    // for hide button 
    const handleClose = () => {
        window.editModal.close()
    }





    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-xs md:table-lg">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Adress</th>
                            <th>Bedrooms </th>
                            <th>Monthly Rent</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            houses && houses.map((item, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.city}</td>
                                <td>{item.bedrooms} </td>
                                <td>{item.rent}$</td>
                                <td className=''>
                                    <div className='flex gap-1'>
                                        <button onClick={() => handleEdit(item._id)} className='btn btn-sm btn-primary  text-white'>Edit</button>
                                        <button onClick={() => handleDealete(item._id)} className='btn btn-sm bg-red-500 text-white'>Delete</button>
                                    </div>
                                </td>
                            </tr>)
                        }




                    </tbody>

                </table>
            </div>

            <input type="checkbox" id="my_modal_7" className="modal-toggle" />


            <dialog id="editModal" className="modal">
                <div method="dialog" className="modal-box">
                    <form onSubmit={handleUpdateHouse}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 my-2 '>
                            <input name='name' defaultValue={current.name}  required type="text" placeholder="Name " className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                            <input name='address' defaultValue={current.address} required type="text" placeholder="Address " className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 my-2'>
                            <input name='city' defaultValue={current.city} required type="text" placeholder="City " className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                            <input name='bedrooms' defaultValue={current.bedrooms} required type="number" placeholder="Bedrooms " className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 my-2'>
                            <input name='bathrooms' defaultValue={current.bathrooms} required type="number" placeholder="Bathrooms" className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                            <input name='romesize' defaultValue={current.romeSize} required type="text" placeholder="Room Size (ft)" className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 my-2'>
                            <input name='picture' defaultValue={current.pictureUrl} required type="url" placeholder="Picture url" className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                            <input name='availabilitydate' defaultValue={current.availabilityDate} required type="date" placeholder="Availability date " className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 my-2'>
                            <input name='rent' defaultValue={current.rent} required type="number" placeholder="Rent per month $" className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                            <input name='number' defaultValue={current.number} required type="number" pattern="01[3-9]\d{8}"
                                title="Please enter a valid Bangladeshi phone number starting with '01' followed by 10 digits."
                                placeholder="Phone number // 018" className="input input-bordered input-primary w-full bg-gray-100 border-0 " />
                        </div>

                        <div className=' my-2'>
                            <textarea defaultValue={current.description} required name="description" id="" cols="30" rows="10" className='h-[100px] input input-bordered input-primary w-full bg-gray-100 border-0 p-5' placeholder='Description ...'></textarea>
                        </div>
            
                        <button className='btn btn-primary text-white w-full'> Update</button>
                    </form>

                    <button className='absolute top-0 right-0 rounded-full bg-red-600 text-white m-3' onClick={handleClose}> <AiFillCloseCircle className='text-3xl font-bold'></AiFillCloseCircle> </button>
                </div>
            </dialog>


        </div>
    );
};

export default MyHouses;