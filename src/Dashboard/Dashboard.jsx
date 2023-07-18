import React from 'react';
import Navbar from '../components/Navbar';
import OwnerDashboard from './Owner/OwnerDashboard';

const Dashboard = () => {

    return (
        <div className='w-full h-full max-w-[100vw] max-h-[100vh] bg-gray-100 overflow-hidden'>
            <div className='bg-white'>
                <div className='container mx-auto'>
                    <Navbar></Navbar>
                </div>
            </div>
            <div>
                <OwnerDashboard></OwnerDashboard>
            </div>

        </div>
    );
};

export default Dashboard;