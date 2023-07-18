import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Authcontext } from '../auth/AuthProvider';

const Navbar = () => {
    const { user, logoutUser } = useContext(Authcontext)

    const navItem = <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
       { !user && <> <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink> </>}
        {
            user &&  <NavLink to="/dashboard">Dashboard</NavLink>
        }
    </>

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navItem}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">HouseHunter</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItem}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <button className='btn btn-primary text-white' onClick={logoutUser}>Logout</button> : <NavLink to='/login' className='btn btn-primary text-white'>Login</NavLink>
                    }


                </div>
            </div>
        </div>
    );
};

export default Navbar;