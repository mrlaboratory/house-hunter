import React from 'react';
import Navbar from '../components/Navbar';

const MainLayout = () => {
    return (
        <div className='bg-gray-100 w-full h-full'>
            <div className='bg-white w-full'>
                <div className='container mx-auto'>
                    <Navbar></Navbar>
                </div>
            </div>
            <button className='btn-primary '>hello</button>
        </div>
    );
};

export default MainLayout;