import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [error, setError] = useState('')


    const handleLogin = e => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        console.log(email);
        console.log(password);
        const info = { email, password }
        fetch(`${import.meta.env.VITE_SERVER}/login/${email}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(d => {
               if(d?.token){
                localStorage.setItem('userToken', d.token)
                console.log(d.token);
               }
                if (d?.error) {
                    console.log(d)
                    setError(d.message)
                }
            })
            .catch(d => setError(d.message))
    }
    return (
        <div className='p-5 my-10'>
            <h2 className='text-2xl font-bold text-center my-5'>Login Now </h2>
            <div className='flex justify-center items-center w-full'>
                <div className='p-5 rounded-xl bg-white shadow-md'>
                    <form onSubmit={handleLogin} className='w-full md:w-[400px]'>
                        <input required type="Email" name='email' placeholder="Email " className="input input-bordered w-full mb-2 " /> <br />
                        <input required type="password" name='password' placeholder="Password " className="input input-bordered w-full mb-2 " /> <br />
                        {error && <h3 className='font-bold text-red-600 my-2'>{error}</h3>}

                        <button className='w-full btn-primary btn'>Login</button> <br /> <br />
                      <p>Don not have an account?  <Link className='p-3' to="/register">Create New Account . </Link> </p> 
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;