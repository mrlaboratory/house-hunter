import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Authcontext } from '../auth/AuthProvider';
import { AiOutlineLoading3Quarters } from 'react-icons/Ai';
import { toast } from 'react-hot-toast';


const Login = () => {
    const [error, setError] = useState('')
    const { refetch, path , user} = useContext(Authcontext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(()=> {
        if(user) {
            navigate(path)
        }
    },[user])

    const handleLogin = e => {
        setError('')
        e.preventDefault()
        setLoading(true)
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
                if (d?.token) {
                    localStorage.setItem('userToken', d.token)
                    refetch()
                    toast.success('Login successfully !!')

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
            <h2 className='text-2xl font-bold text-center my-5'>Login Now </h2>
            <div className='flex justify-center items-center w-full'>
                <div className='p-5 rounded-xl bg-white shadow-md'>
                    <form onSubmit={handleLogin} className='w-full md:w-[400px]'>
                        <input required type="Email" name='email' placeholder="Email " className="input input-bordered w-full mb-2 " /> <br />
                        <input required type="password" name='password' placeholder="Password " className="input input-bordered w-full mb-2 " /> <br />
                        {error && <h3 className='font-bold text-red-600 my-2'>{error}</h3>}

                        <button className='w-full btn-primary btn'>{loading ? <AiOutlineLoading3Quarters className='text-2xl font-bold animate-spin'></AiOutlineLoading3Quarters> : 'Login'} </button> <br /> <br />
                        <p>Don not have an account?  <Link className='p-3' to="/register">Create New Account . </Link> </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;