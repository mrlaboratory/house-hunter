import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/Ai';
import { Link, useNavigate } from 'react-router-dom';
import { Authcontext } from '../auth/AuthProvider';

const Register = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { refetch, path , user} = useContext(Authcontext)
    const navigate = useNavigate()

    useEffect(()=> {
        if(user) {
            navigate(path)
        }
    },[user])

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleRegister = e => {
        setLoading(true)
        setError('')
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const phone = form.number.value
        const email = form.email.value
        const password = form.password.value
        const photo = 'https://mrlaboratory.github.io/img/user.png'
        const info = { name, photo, phone, email, password, role: selectedValue }
        console.log(info);
        fetch(`${import.meta.env.VITE_SERVER}/register/${email}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(d => {
                if(d.token){
                    localStorage.setItem('userToken', d.token)
                    toast.success('Account created successfully !!')
                    refetch()
                }
                if (d?.error) {
                    console.log(d)
                    setError(d.message)


                }
                setLoading(false)
            })
            .catch(d => {
                setError(d.message)
                setLoading(false)
            })

    }



    return (
        <div className='p-5 my-10'>
            <h2 className='text-2xl font-bold text-center my-5'>Register now </h2>
            <div className='flex justify-center items-center'>
                <div className='p-5 rounded-xl bg-white   shadow-md'>
                    <form onSubmit={handleRegister} className='w-full md:w-[400px]'>
                        <input required type="text" name='name' placeholder="Full name  " className="input input-bordered w-full mb-2 " /> <br />
                        <select required onChange={handleSelectChange} value={selectedValue} className="select select-bordered w-full mb-2 ">
                            <option disabled selected value=''>Select</option>
                            <option value='House Owner'>House Owner</option>
                            <option value='House Renter'>House Renter</option>
                        </select>
                        <input required type="number" name='number' placeholder="Number  " className="input input-bordered w-full mb-2 " /> <br />
                        <input required type="Email" name='email' placeholder="Email " className="input input-bordered w-full mb-2 " /> <br />
                        <input required type="password" name='password' placeholder="Password " className="input input-bordered w-full mb-2 " /> <br />
                        {error && <h3 className='font-bold text-red-600 my-2'>{error}</h3>}

                        <button className='w-full btn-primary btn'>{loading ? <AiOutlineLoading3Quarters className='text-2xl font-bold animate-spin'></AiOutlineLoading3Quarters> : 'Register'}</button> <br /> <br />
                        <Link className='p-3' to="/login">Login page . </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;