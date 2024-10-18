

import React from 'react'
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const logInUser = localStorage.getItem('loggedInUser');
    return logInUser ? children : <Navigate to={"/"} />
}

export default PrivateRoute