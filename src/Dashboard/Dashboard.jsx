import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import OwnerDashboard from './Owner/OwnerDashboard';
import Spinner from '../components/Spinner';
import RenterDashboard from './Renter/RenterDashboard';
import { Authcontext } from '../auth/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(Authcontext)

    return (
        <div className='w-full h-full max-w-[100vw] max-h-[100vh] bg-gray-100 '>
            <div className='bg-white'>
                <div className='container mx-auto'>
                    <Navbar></Navbar>
                </div>
            </div>
            <div>
                {
                    user?.role === 'House Owner' && <OwnerDashboard></OwnerDashboard>
                }
                {
                    user?.role === 'House Renter' &&  <RenterDashboard></RenterDashboard>
                }
               
            </div>


        </div>
    );
};

export default Dashboard;