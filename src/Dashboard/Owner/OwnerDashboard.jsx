
import React from 'react';
import { AiFillHome } from 'react-icons/Ai';
import { HiUsers } from 'react-icons/Hi';
import { BsFillHousesFill } from 'react-icons/Bs';
import { NavLink, Outlet } from 'react-router-dom';

const OwnerDashboard = () => {

    
    return (
        <div className="drawer lg:drawer-open">
        <input id="drawermr" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
            <div>
                <label htmlFor="drawermr" className="btn btn-primary drawer-button lg:hidden  m-1"> Menu </label>
            </div>
            <div className='p-5 bg-gray-100 w-full h-full overflow-y-scroll'>
               <Outlet></Outlet>
            </div>

        </div>
        <div className="drawer-side ">
            <label htmlFor="drawermr" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 h-full bg-gray-200  dd ">

                <NavLink className='btn flex justify-start rounded-lg shadow-md border bg-white my-1 text-gray-600 ' to='/dashboard/myhouses'> <BsFillHousesFill className='text-xl'></BsFillHousesFill>My Houses </NavLink>
                
                <NavLink className='btn flex justify-start rounded-lg shadow-md border bg-white my-1 text-gray-600 ' to='/dashboard/addhouse'> <AiFillHome className='text-xl'></AiFillHome>Add New House</NavLink>
                {/* <NavLink to='/dashboard/applymodarator' className='btn flex justify-start rounded-lg shadow-md border bg-white my-1 text-gray-600 '> <HiUsers className='text-xl'></HiUsers> Manage Article </NavLink> */}

            </ul>

        </div>
    </div>
    );
};

export default OwnerDashboard;