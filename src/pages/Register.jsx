import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleRegister = e => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const phone = form.number.value
        const email = form.email.value
        const password = form.password.value
        const photo = 'https://mrlaboratory.github.io/img/user.png'
        const info = { name, photo, phone, email, password, role: selectedValue }
        console.log(info);
    }
    return (
        <div className='p-5 my-10'>
            <h2 className='text-2xl font-bold text-center my-5'>Register now </h2>
            <div className='flex justify-center items-center'>
                <div className='p-5 rounded-xl bg-white border-2 border-gray-200'>
                    <form onSubmit={handleRegister} className='w-full md:w-[400px]'>
                        <input type="text" name='name' placeholder="Full name  " className="input input-bordered w-full mb-2 " /> <br />
                        <select onChange={handleSelectChange} value={selectedValue} className="select select-bordered w-full mb-2 ">
                            <option disabled selected value=''>Select</option>
                            <option value='House Owner'>House Owner</option>
                            <option value='House Renter'>House Renter</option>
                        </select>
                        <input type="number" name='number' placeholder="Number  " className="input input-bordered w-full mb-2 " /> <br />
                        <input type="Email" name='email' placeholder="Email " className="input input-bordered w-full mb-2 " /> <br />
                        <input type="password" name='password' placeholder="Password " className="input input-bordered w-full mb-2 " /> <br />
                        <button className='w-full btn-primary btn'>Register</button> <br /> <br />
                        <Link className='p-3' to="/login">Login page . </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;