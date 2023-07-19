import React from 'react';

const HouseCard = ({ name, pictureUrl, rent , city, bedrooms, bathrooms, romeSize}) => {
    return (
        <div className='p-2 rounded-lg bg-white relative shadow-md group'>
            <div className='w-full overflow-hidden rounded-lg'>
                <img className=' object-cover group-hover:scale-110 duration-500' src='https://i.ibb.co/bHF5rM1/7-budget-friendly-kids-room-design-ideas.webp' alt="" />
            </div>
            <div>
                <h2 className='text-xl'> {name}</h2>
                <h3>In - {city}</h3>
                <h3>(Bedrooms - {bedrooms}) (Bathrooms - {bathrooms}) (RoomSize - {romeSize}ft)</h3>
            </div>
            <button className='w-full btn btn-primary btn-sm mt-2'>Book</button>
            <span className='bg-white p-1 rounded-lg absolute top-0 right-0 text-gray-700 font-bold'>{rent}$</span>



        </div>
    );
};

export default HouseCard;