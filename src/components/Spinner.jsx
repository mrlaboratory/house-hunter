import React from 'react';
import { BounceLoader } from 'react-spinners';


const Spinner = () => {
    return (
        <div className='my-10 flex justify-center items-center'>
            <BounceLoader color="#248de4" />
        </div>
    );
};

export default Spinner;