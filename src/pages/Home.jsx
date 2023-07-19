import React, { useContext } from 'react';
import AllHouses from '../components/AllHouses';
import { Authcontext } from '../auth/AuthProvider';
import Spinner from '../components/Spinner';

const Home = () => {
    const { user, loading } = useContext(Authcontext)
    console.log(loading);
    if (loading) {
        return <Spinner></Spinner>
    } else {
        return <div>
            <AllHouses></AllHouses>
        </div>
    }

};

export default Home;