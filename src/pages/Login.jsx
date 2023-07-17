import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    const handleLogin = e => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        console.log(email);
        console.log(password);

    }
    return (
        <div className='p-5 my-10'>
            <h2 className='text-2xl font-bold text-center my-5'>Login Now </h2>
            <div className='flex justify-center items-center'>
                <div className='p-5 rounded-xl bg-white border-2 border-gray-200'>
                    <form onSubmit={handleLogin} className='w-full md:w-[400px]'>
                        <input type="Email" name='email' placeholder="Email " className="input input-bordered w-full mb-2 " /> <br />
                        <input type="password" name='password' placeholder="Password " className="input input-bordered w-full mb-2 " /> <br />
                        <button className='w-full btn-primary btn'>Login</button> <br /> <br />
                        <Link className='p-3' to="/register">Create New Account . </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;