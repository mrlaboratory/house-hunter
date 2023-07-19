import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className='bg-gray-100 w-full h-full'>
            <div className='bg-white w-full border-gray-200 border-b-2'>
                <div className='container mx-auto'>
                    <Navbar></Navbar>
                </div>
            </div>

            <div className="min-h-[calc(100vh-64px)]">
                <div className="container mx-auto" >
                    <Outlet></Outlet>
                </div>
                <div className='bg-gray-700'>
                    <div className='container mx-auto'>
                        <Footer></Footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;