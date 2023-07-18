import React, { useContext } from 'react';
import { Authcontext } from '../auth/AuthProvider';
import Spinner from '../components/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading, setPath} = useContext(Authcontext)
    const navigate = useNavigate()
    const location = useLocation()
    // setPath(location.pathname)
    console.log(location);
    if (!user && !loading) {
        navigate('/login')
      } else if (!user && loading) {
        <Spinner/>
      } else {
       return <>{children}</>
      }
      
};

export default PrivateRoute;